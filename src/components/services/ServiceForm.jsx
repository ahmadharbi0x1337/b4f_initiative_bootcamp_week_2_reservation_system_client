const ServiceForm = ({
  serviceForm,
  setServiceForm,
  editingServiceId,
  onSubmit,
  onCancel,
  actionLoading,
}) => {
  const isEditing = editingServiceId !== null;

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          {isEditing ? "Edit Service" : "Add Service"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update service information"
            : "Add a new service"}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Service Name
          </label>

          <input
            type="text"
            value={serviceForm.name}
            onChange={(event) =>
              setServiceForm({
                ...serviceForm,
                name: event.target.value,
              })
            }
            required
            placeholder="Enter service name"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Duration (minutes)
          </label>

          <input
            type="number"
            min="1"
            value={serviceForm.duration}
            onChange={(event) =>
              setServiceForm({
                ...serviceForm,
                duration: event.target.value,
              })
            }
            required
            placeholder="Enter duration"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Price
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={serviceForm.price}
            onChange={(event) =>
              setServiceForm({
                ...serviceForm,
                price: event.target.value,
              })
            }
            required
            placeholder="Enter price"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={actionLoading}
          className="rounded-md bg-[#0B9BD7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0787BD] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLoading
            ? "Saving..."
            : isEditing
              ? "Update Service"
              : "Add Service"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
