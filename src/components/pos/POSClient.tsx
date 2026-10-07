"use client";

import { useState } from "react";
import { Search, Plus, Minus, Trash2, ShoppingCart, User, Store, CreditCard, CheckCircle } from "lucide-react";
import { processSale } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function POSClient({ products, shops, paymentMethods, members }: any) {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  
  // Checkout state
  const [shopId, setShopId] = useState("");
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Filters
  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
    (p.barcode && p.barcode.toLowerCase().includes(search.toLowerCase()))
  );

  const addToCart = (product: any) => {
    if (product.stock <= 0) return toast.error("Product is out of stock!");
    
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          toast.error("Cannot add more than available stock!");
          return prev;
        }
        return prev.map(item => item.product_id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product_id: product.id, name: product.name, qty: 1, unit_price: product.price }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product_id === id) {
        const product = products.find((p: any) => p.id === id);
        const newQty = item.qty + delta;
        if (newQty > product.stock) {
          toast.error("Cannot exceed available stock!");
          return item;
        }
        if (newQty < 1) return item;
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product_id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.qty * item.unit_price), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Cart is empty!");
    if (!shopId) return toast.error("Please select a Shop location!", { icon: "⚠️" });
    if (!paymentMethodName) return toast.error("Please select a Payment Method!", { icon: "⚠️" });

    setIsProcessing(true);
    try {
      const saleNumber = await processSale({
        shop_id: shopId,
        customer_name: customerName,
        payment_method_name: paymentMethodName,
        cart,
        total: subtotal
      });
      toast.success("Checkout complete! Sale " + saleNumber + " processed.", { icon: <CheckCircle className="text-green-500 w-5 h-5"/> });
      setCart([]);
      setCustomerName("");
      setPaymentMethodName("");
      // Don't reset shopId as they likely stay at the same shop
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      
      {/* LEFT: Product Catalog */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Available Products</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Scan Barcode / SKU or search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 outline-none text-base"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((p: any) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stock <= 0}
                className={["flex flex-col text-left p-4 rounded-xl border transition-all", p.stock > 0 ? "border-gray-200 hover:border-orange-500 hover:shadow-md bg-white cursor-pointer" : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"].join(" ")}
              >
                <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2 text-sm mb-1">{p.name}</h3>
                <p className="text-orange-600 font-bold mb-2">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                <div className="mt-auto flex items-center justify-between w-full">
                  <span className="text-xs text-gray-500">{p.sku || p.barcode || 'No SKU'}</span>
                  <span className={["text-xs font-bold px-2 py-0.5 rounded-full", p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"].join(" ")}>
                    Stock: {p.stock}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">No products found matching "{search}"</div>
          )}
        </div>
      </div>

      {/* RIGHT: Cart & Checkout */}
      <div className="w-full lg:w-96 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-shrink-0">
        
        {/* Cart Headers & Settings */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 space-y-4">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Store className="w-4 h-4 text-gray-400" />
            </div>
            <select 
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              className={["block w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none appearance-none cursor-pointer", shopId ? "border-gray-300 focus:border-orange-500" : "border-red-300 focus:border-red-500"].join(" ")}
            >
              <option value="">-- Select Shop Location * --</option>
              {shops.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Customer Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart className="w-12 h-12 mb-3 opacity-20" />
              <p>Cart is empty</p>
              <p className="text-xs mt-1 text-gray-500">Scan or select a product to begin</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product_id} className="flex flex-col p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900 text-sm leading-tight">{item.name}</span>
                  <button onClick={() => removeFromCart(item.product_id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-orange-600 font-bold text-sm">Rp {Number(item.unit_price).toLocaleString('id-ID')}</span>
                  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                    <button onClick={() => updateQty(item.product_id, -1)} className="text-gray-500 hover:text-orange-600 disabled:opacity-50" disabled={item.qty <= 1}><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.product_id, 1)} className="text-gray-500 hover:text-orange-600"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CreditCard className="w-4 h-4 text-gray-400" />
            </div>
            <select 
              value={paymentMethodName}
              onChange={(e) => setPaymentMethodName(e.target.value)}
              className={["block w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none appearance-none cursor-pointer", paymentMethodName ? "border-gray-300 focus:border-orange-500" : "border-red-300 focus:border-red-500"].join(" ")}
            >
              <option value="">-- Select Payment Method * --</option>
              {paymentMethods.map((pm: any) => <option key={pm.id} value={pm.name}>{pm.name}</option>)}
            </select>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="text-2xl font-bold text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-lg"
          >
            {isProcessing ? "Processing..." : "Complete Sale"}
          </button>
        </div>

      </div>

    </div>
  );
}
