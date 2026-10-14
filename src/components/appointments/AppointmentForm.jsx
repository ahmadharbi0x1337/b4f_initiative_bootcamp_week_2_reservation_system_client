const AppointmentForm = ({
  appointmentForm,
  setAppointmentForm,
  services,
  editingAppointmentId,
  onSubmit,
  onCancel,
  actionLoading,
}) => {
  const isEditing = editingAppointmentId !== null;

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          {isEditing ? "Edit Appointment" : "Add Appointment"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update appointment information"
            : "Add a new appointment"}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Customer Name
          </label>

          <input
            type="text"
            value={appointmentForm.customerName}
            onChange={(event) =>
              setAppointmentForm({
                ...appointmentForm,
                customerName: event.target.value,
              })
            }
            required
            placeholder="Enter customer name"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Service
          </label>

          <select
            value={appointmentForm.serviceId}
            onChange={(event) =>
              setAppointmentForm({
                ...appointmentForm,
                serviceId: event.target.value,
              })
            }
            required
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Date
          </label>

          <input
            type="date"
            value={appointmentForm.date}
            onChange={(event) =>
              setAppointmentForm({
                ...appointmentForm,
                date: event.target.value,
              })
            }
            required
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Time
          </label>

          <input
            type="time"
            value={appointmentForm.time}
            onChange={(event) =>
              setAppointmentForm({
                ...appointmentForm,
                time: event.target.value,
              })
            }
            required
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
              ? "Update Appointment"
              : "Add Appointment"}
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

export default AppointmentForm;