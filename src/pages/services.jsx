import { useEffect, useState } from "react";

import { get, remove, add, update } from "../services/api";

import ServiceForm from "../components/services/ServiceForm";
import ServiceTable from "../components/services/ServiceTable";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const servicesUrl = "http://localhost:3000/services";

const Services = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const servicesData = await get(servicesUrl);

      setServices(servicesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setServiceForm({
      name: "",
      duration: "",
      price: "",
    });

    setEditingServiceId(null);
    setShowForm(true);
  };

  const handleEditService = (service) => {
    setServiceForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
    });

    setEditingServiceId(service.id);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");

      const serviceData = {
        name: serviceForm.name,
        duration: Number(serviceForm.duration),
        price: Number(serviceForm.price),
      };

      if (editingServiceId === null) {
        await add(servicesUrl, serviceData);
      } else {
        await update(servicesUrl, serviceData, editingServiceId);
      }

      await loadData();
      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingServiceId(null);
  };

  const deleteService = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await remove(servicesUrl, id);

      await loadData();
      setServiceToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading services..." />;
  }

  if (error && services.length === 0) {
    return <ErrorState message={error} onRetry={loadData} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Services</h1>

            <p className="mt-1 text-sm text-slate-500">Manage your services</p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-md bg-[#0B9BD7] px-4 py-2 text-white transition hover:bg-[#0787BD]"
          >
            + Add Service
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <ServiceForm
            serviceForm={serviceForm}
            setServiceForm={setServiceForm}
            editingServiceId={editingServiceId}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            actionLoading={actionLoading}
          />
        )}

        {services.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center">
            <p className="font-medium text-slate-700">No services found</p>

            <p className="mt-1 text-sm text-slate-500">
              Add a new service to get started.
            </p>
          </div>
        ) : (
          <ServiceTable
            services={services}
            onEdit={handleEditService}
            onDelete={(service) => setServiceToDelete(service)}
          />
        )}

        <DeleteConfirmModal
          item={serviceToDelete}
          itemName={serviceToDelete?.name}
          onCancel={() => setServiceToDelete(null)}
          onConfirm={() => deleteService(serviceToDelete.id)}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default Services;
