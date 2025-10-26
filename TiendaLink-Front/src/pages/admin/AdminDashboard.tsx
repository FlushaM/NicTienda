import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Home,
  Menu as MenuIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHome from '../admin/dashboard/DashboardHome';
import OrdersManagement from '../admin/orders/OrdersManagement';
import PageEditor from '../admin/editor/PageEditor';


const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'edit' | 'orders' | 'stats' | 'settings'>('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Inicio', view: 'home' },
    { icon: <LayoutGrid className="w-5 h-5" />, label: 'Editar Página', view: 'edit' },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Pedidos', view: 'orders' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración', view: 'settings' }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome onNavigate={handleNavigate} />;
      case 'orders':
        return <OrdersManagement onBack={() => setCurrentView('home')} />;
      case 'edit':
        return <PageEditor onBack={() => setCurrentView('home')} />;
      default:
        return <DashboardHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.view
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="p-8">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;