"use client";

import { useState } from "react";
import { Search, ShoppingCart, CheckCircle, Trash2 } from "lucide-react";
import { completeSale } from "./actions";
import { useRouter } from "next/navigation";

export default function PosClient({ packages, members }: { packages: any[], members: any[] }) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package to sell.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("package_id", selectedPackage.id);
    
    const res = await completeSale(formData);
    
    setIsSubmitting(false);
    if (res?.error) {
      alert(res.error);
    } else {
      setSuccess(true);
      setSelectedPackage(null);
      e.currentTarget.reset();
      
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      
      {/* LEFT: Available Products */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search packages..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {packages.map(pkg => (
            <div 
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPackage?.id === pkg.id 
                  ? 'border-orange-500 ring-2 ring-orange-100 bg-orange-50/50' 
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
              }`}
            >
              <div className="font-bold text-gray-900 mb-1">{pkg.name}</div>
              <div className="text-sm text-gray-500 mb-3">{pkg.total_sessions} Sessions • {pkg.duration_days} Days</div>
              <div className="text-orange-600 font-bold">
                IDR {pkg.price.toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Current Sale (Cart) */}
      <div className="w-full lg:w-[400px] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700 flex items-center justify-between">
          <span>Current Sale</span>
          <ShoppingCart className="w-5 h-5 text-gray-400" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          {/* Cart Items Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/30">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <div className="text-lg font-bold text-gray-900">Sale Completed!</div>
                <p className="text-sm text-gray-500">Member package has been activated.</p>
              </div>
            ) : !selectedPackage ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Cart is empty. Select a package.
              </div>
            ) : (
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{selectedPackage.name}</div>
                  <div className="text-xs text-gray-500">1 x IDR {selectedPackage.price.toLocaleString('id-ID')}</div>
                </div>
                <button type="button" onClick={() => setSelectedPackage(null)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Checkout Details */}
          <div className="p-4 border-t border-gray-200 space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Customer *</label>
              <select name="member_id" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select a customer...</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Payment Method *</label>
              <select name="payment_method" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select an option...</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CREDIT_CARD">Credit Card / EDC</option>
                <option value="QRIS">QRIS</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Notes (Optional)</label>
              <input name="notes" type="text" placeholder="Optional notes..." className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  Rp {selectedPackage ? selectedPackage.price.toLocaleString('id-ID') : 0}
                </span>
              </div>
              
              <button 
                type="submit" 
                disabled={!selectedPackage || isSubmitting}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors flex justify-center items-center"
              >
                {isSubmitting ? "Processing..." : "Complete Sale"}
              </button>
            </div>
            
          </div>
        </form>
      </div>

    </div>
  );
}
