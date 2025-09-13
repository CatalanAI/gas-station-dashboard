export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1" style={{ marginLeft: '5rem', marginRight: '5rem', marginTop: '3rem', marginBottom: '1.5rem' }}>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">
          Real-time analytics for your gas station
        </p>
      </div>
    </header>
  );
}