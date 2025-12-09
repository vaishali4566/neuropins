export default function SidebarItem({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-xl bg-slate/40 hover:bg-slate/60 transition cursor-pointer"
    >
      {icon}
    </button>
  );
}
