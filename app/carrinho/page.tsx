// app/checkout/page.tsx
import Image from "next/image";
import { Trash2, MessageCircle } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Italy Pizza",
    desc: "Extra cheese and toping",
    price: 681,
    image: "/images/mastercard.png"
  },
  {
    id: 2,
    name: "Combo Plate", 
    desc: "Extra cheese and toping",
    price: 681,
  },
  {
    id: 3,
    name: "Spanish Rice",
    desc: "Extra garlic",
    price: 681,
  },
];

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <div className="items-center space-x-5">
      {/* Carrinho - Lado Esquerdo */}
    
      <div className="w-full md:w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-2">Shopping Continue</h2>
        <h2>____________________________________________________________________________________________________________</h2>
        <h3 className="text-lg font-semibold mb-2">Shopping cart</h3>
        <p className="text-gray-500 mb-6">
          You have {cartItems.length} item in your cart
        </p>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <div className="flex items-center space-x-2">
                <img  src="/images/visa.png"  alt="VISA"  className="h-6 w-6 border border-gray-300 rounded"/>
                    <span className="font-semibold">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="border rounded-md px-2 py-1">1 ⭐</span>
                  <span className="font-semibold">${item.price}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.desc}</span>
                <MessageCircle className="text-gray-400" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detalhes do Cartão - Lado Direito */}
      <div className="w-full md:w-1/3 bg-blue-800 text-white p-6 ">
        <div>
          <h2 className="text-lg font-semibold mb-4">Card Details</h2>
          
          {/* Card Type */}
          <div className="mb-6">
            <div className="text-sm mb-2">Card type</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">
                <img src="/images/mastercard.png" alt="VISA" className="inline h-8 w-auto border border-gray-500" />
              </span>
              <span className="text-sm">
                <img src="/images/visa.png" alt="VISA" className="inline h-8 w-auto border border-gray-500" />
              </span>
              <span className="text-sm">
                <img src="/images/rupay.png" alt="VISA" className="inline h-8 w-auto border border-gray-500" />
              </span>
            </div>
            <span className="text-sm underline cursor-pointer">See all</span>
          </div>
    
          {/* Formulário do Cartão */}
          <div className="space-y-4">
            <div>
              <div className="text-sm mb-1">Name on card</div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 rounded-lg text-black text-sm bg-indigo-500"
              />
            </div>
            
            <div>
              <div className="text-sm mb-1">Card Number</div>
              <input
                type="text"
                placeholder="111 2222 3333 4444"
                className="w-full px-3 py-2 rounded-lg text-black text-sm bg-indigo-500"
              />
            </div>
            
            <div>
              <div className="text-sm mb-1">Expiration date</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="flex-1 px-3 py-2 rounded-lg text-black text-sm bg-indigo-500"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-20 px-3 py-2 rounded-lg text-black text-sm bg-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
            <span>Total (Tax incl.)</span>
            <span>${total}</span>
          </div>

          <button className="w-full mt-6 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-xl py-3 flex items-center justify-center gap-2">
            Checkout ${total} →
          </button>
        </div>
      </div>
    </div>
  );
}