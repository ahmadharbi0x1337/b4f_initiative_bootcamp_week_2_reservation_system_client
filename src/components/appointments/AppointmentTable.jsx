const AppointmentTable = ({
  appointments,
  getServiceName,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-[15px] text-slate-600">
        <thead className="bg-slate-200 text-xs font-medium uppercase text-slate-800">
          <tr>
            <th className="px-6 py-4 font-semibold">#</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Service</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Time</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={appointment.id}
              className="border-t border-slate-300 transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium text-slate-500">
                {index + 1}
              </td>

              <td className="px-6 py-4 font-medium text-slate-800">
                {appointment.customerName}
              </td>

              <td className="px-6 py-4">
                {getServiceName(appointment.serviceId)}
              </td>

              <td className="px-6 py-4">
                {appointment.date}
              </td>

              <td className="px-6 py-4">
                {appointment.time}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(appointment)}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-[#087FAF] transition hover:bg-sky-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(appointment)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
