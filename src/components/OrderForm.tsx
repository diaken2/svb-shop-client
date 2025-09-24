import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  total: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, cart, total }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+7",
    address: "",
    comment: "",
    deliveryService: "sdek"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^0-9]/g, "");
    }
    if (value.length <= 16) {
      handleInputChange("phone", value);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Введите ФИО");
      return false;
    }
    if (formData.phone.length < 11) {
      setError("Введите корректный номер телефона");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Введите адрес доставки");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderText = `
🛒 НОВЫЙ ЗАКАЗ С САЙТА

👤 ФИО: ${formData.fullName}
📱 Телефон: ${formData.phone}
📍 Адрес: ${formData.address}
🚚 Служба доставки: ${formData.deliveryService === 'sdek' ? 'СДЭК' : 'Почта России'}
💬 Комментарий: ${formData.comment || "Не указан"}

🛍️ Товары:
${cart.map(item => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ₽`).join('\n')}

💰 Итого: ${total} ₽
      `.trim();

      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: orderText,
          type: 'order'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({ 
            fullName: "", 
            phone: "+7", 
            address: "", 
            comment: "",
            deliveryService: "sdek" 
          });
          router.push('/complete');
        }, 2000);
      } else {
        setError("Ошибка при отправке. Попробуйте позже.");
      }
    } catch (err) {
      setError("Сетевая ошибка. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {isSubmitted ? "Заказ оформлен!" : "Оформление заказа"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-gray-600 mb-4">
                    Спасибо! Ваш заказ отправлен. Мы свяжемся с вами в ближайшее время.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ФИО *
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес доставки *
                    </label>
                    <Textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Улица, дом, квартира"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Служба доставки *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryService"
                          value="sdek"
                          checked={formData.deliveryService === 'sdek'}
                          onChange={(e) => handleInputChange("deliveryService", e.target.value)}
                          className="mr-2"
                        />
                        СДЭК
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryService"
                          value="post"
                          checked={formData.deliveryService === 'post'}
                          onChange={(e) => handleInputChange("deliveryService", e.target.value)}
                          className="mr-2"
                        />
                        Почта России
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Комментарий к заказу
                    </label>
                    <Textarea
                      value={formData.comment}
                      onChange={(e) => handleInputChange("comment", e.target.value)}
                      placeholder="Дополнительная информация"
                      rows={2}
                    />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Ваш заказ:</p>
                    <div className="space-y-1">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Итого:</span>
                          <span>{total} ₽</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Отправка..." : "Оформить заказ"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderForm;