import { useEffect, useState } from "react";

import { get, remove, add, update } from "../services/api";

import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentTable from "../components/appointments/AppointmentTable";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const appointmentsUrl = "http://localhost:3000/appointments";
const servicesUrl = "http://localhost:3000/services";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    serviceId: "",
    customerName: "",
    date: "",
    time: "",
  });

  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [appointmentsData, servicesData] = await Promise.all([
        get(appointmentsUrl),
        get(servicesUrl),
      ]);

      setAppointments(appointmentsData);
      setServices(servicesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setAppointmentForm({
      serviceId: "",
      customerName: "",
      date: "",
      time: "",
    });

    setEditingAppointmentId(null);
    setShowForm(true);
  };

  const handleEditAppointment = (appointment) => {
    setAppointmentForm({
      serviceId: appointment.serviceId,
      customerName: appointment.customerName,
      date: appointment.date,
      time: appointment.time,
    });

    setEditingAppointmentId(appointment.id);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");

      const appointmentData = {
        ...appointmentForm,
      };

      if (editingAppointmentId === null) {
        await add(appointmentsUrl, appointmentData);
      } else {
        await update(
          appointmentsUrl,
          appointmentData,
          editingAppointmentId
        );
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
    setEditingAppointmentId(null);
  };

  const deleteAppointment = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await remove(appointmentsUrl, id);

      await loadData();
      setAppointmentToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getServiceName = (serviceId) => {
    const service = services.find(
      (service) => String(service.id) === String(serviceId)
    );

    return service ? service.name : "Unknown Service";
  };

  if (loading) {
    return <LoadingState message="Loading appointments..." />;
  }

  if (error && appointments.length === 0) {
    return (
      <ErrorState
        message={error}
        onRetry={loadData}
        loading={loading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Appointments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage customer appointments
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-md bg-[#0B9BD7] px-4 py-2 text-white transition hover:bg-[#0787BD]"
          >
            + Add Appointment
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <AppointmentForm
            appointmentForm={appointmentForm}
            setAppointmentForm={setAppointmentForm}
            services={services}
            editingAppointmentId={editingAppointmentId}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            actionLoading={actionLoading}
          />
        )}

        {appointments.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center">
            <p className="font-medium text-slate-700">
              No appointments found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Add a new appointment to get started.
            </p>
          </div>
        ) : (
          <AppointmentTable
            appointments={appointments}
            getServiceName={getServiceName}
            onEdit={handleEditAppointment}
            onDelete={(appointment) =>
              setAppointmentToDelete(appointment)
            }
          />
        )}

        <DeleteConfirmModal
          item={appointmentToDelete}
          itemName={appointmentToDelete?.customerName}
          onCancel={() => setAppointmentToDelete(null)}
          onConfirm={() =>
            deleteAppointment(appointmentToDelete.id)
          }
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default Appointments;
