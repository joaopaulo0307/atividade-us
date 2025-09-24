// app/checkout/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Italy Pizza",
      desc: "Extra cheese and topping",
      price: 681,
      image: "/images/refeicao1.png", // Imagem real do produto
    },
    {
      id: 2,
      name: "Combo Plate", 
      desc: "Extra cheese and topping",
      price: 520,
      image: "/images/refeicao2.png",
    },
    {
      id: 3,
      name: "Spanish Rice",
      desc: "Extra garlic",
      price: 350,
      image: "/images/refeicao3.png",
    },
  ]);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  // Atualizar quantidade
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };

  // Remover item
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  // Cálculos dinâmicos
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 0),
    0
  );
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Carrinho */}
      <div className="w-full md:w-2/3 space-y-4">
        <h2 className="text-2xl font-bold mb-2">Shopping Cart</h2>
        <div className="border-b mb-4"></div>

        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-20 w-20 rounded-lg object-cover" 
              />
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                min="1" 
                value={quantities[item.id] || 0}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 text-center border rounded-md"
              />
              <span className="font-semibold">${item.price * (quantities[item.id] || 0)}</span>
              <Trash2 
                onClick={() => removeItem(item.id)}
                className="text-gray-400 cursor-pointer hover:text-red-500" 
                size={20} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Resumo do Pedido */}
      <div className="w-full md:w-1/3 bg-violet-600 text-white p-6 rounded-xl space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">Card Details</h2>
        <img src="/images/pessoa.png" alt="Mastercard" className="h-12 w-12  border rounded" />
      </div>
        <div className="flex items-center gap-2 mb-">
          <img src="/images/mastercard.png" alt="Mastercard" className="h-12 w-auto border rounded" />
          <img src="/images/visa.png" alt="Visa" className="h-12 w-auto border rounded" />
          <img src="/images/rupay.png" alt="Rupay" className="h-12 w-auto border rounded" />
          <span className="h-12 ml-auto border rounded flex items-center">See all</span>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Name on card" 
            className="w-full px-3 py-2 rounded-lg text-white placeholder-gray-300 text-sm bg-violet-500 border border-violet-600" 
          />
          <input 
            type="text" 
            placeholder="Card Number" 
            className="w-full px-3 py-2 rounded-lg text-white placeholder-gray-300 text-sm bg-violet-500 border border-violet-600" 
          />
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="mm/yy" 
              className="flex-1 px-3 py-2 rounded-lg text-white placeholder-gray-300 text-sm bg-violet-500 border border-violet-600" 
            />
            <input 
              type="text" 
              placeholder="CVV" 
              className="w-20 px-3 py-2 rounded-lg text-white placeholder-gray-300 text-sm bg-violet-500 border border-violet-600" 
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total (Tax incl.)</span>
            <span>${total}</span>
          </div>

          <button className="w-full mt-4 bg-green-300 hover:bg-green-500 text-black font-semibold rounded-xl py-3 transition-colors flex justify-between text-white">
            <span>${total}</span>
            <span>Checkout →</span>
          </button>
        </div>
      </div>
    </div>
  );
}