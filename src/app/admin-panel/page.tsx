'use client';
import React, { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  additionalImages?: string[];
  specs?: string[];
  type?: "promotional" | "hit" | "new" | "regular";
  description?: string;
  shortDesc?: string;
  meta?: any;
};

type Order = {
  invId: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    deliveryService: 'sdek' | 'post';
    comment: string;
  };
  cart: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'created' | 'paid' | 'failed' | 'shipped';
  createdAt: string;
  paidAt?: string;
};

const IMGBB_API_KEY = '92883bc6a0d75c6e035cc333384bcdae';

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<'products'>('products'); // Убрали заказы

  // Состояния для товаров
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function fetchList() {
    setLoading(true);
    setError('');
    try {
      const url = 'https://svb-shop-back.onrender.com/api/products' + (q ? `?q=${encodeURIComponent(q)}` : '');
      const r = await fetch(url);
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'fetch error');
      setItems(data.items || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === 'products') fetchList();
  }, [activeTab, q]);

  function openCreate() {
    setEditing(null);
    setIsFormOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setIsFormOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить товар?')) return;
    try {
      const r = await fetch(`https://svb-shop-back.onrender.com/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'delete failed');
      setItems(prev => prev.filter(x => x.id !== id));
      alert('Удалено');
    } catch (err: any) {
      alert(err.message || 'Ошибка удаления');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Админ-панель</h1>
          <div className="flex border-b">
            <button
              className={`pb-2 px-4 border-b-2 border-blue-600 text-blue-600`}
            >
              Товары
            </button>
          </div>
        </header>

        {activeTab === 'products' && (
          <>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Управление товарами</h2>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Поиск по названию..."
                  className="px-3 py-2 border rounded-md flex-1"
                />
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={fetchList}
                  >
                    Поиск
                  </button>
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={openCreate}
                  >
                    + Создать
                  </button>
                </div>
              </div>
            </header>

            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map(p => (
                <div key={p.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow">
                  <img 
                    src={p.image || '/placeholder.png'} 
                    className="w-full sm:w-24 h-24 object-cover rounded" 
                    alt={p.name} 
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.shortDesc}</p>
                    <div className="mb-3">
                      {p.oldPrice && p.oldPrice > p.price && (
                        <div className="text-sm text-gray-500 line-through mb-1">
                          {Number(p.oldPrice).toLocaleString()} ₽
                        </div>
                      )}
                      <div className="text-xl font-bold text-green-600">
                        {Number(p.price).toLocaleString()} ₽
                      </div>
                      {p.oldPrice && p.oldPrice > p.price && (
                        <div className="text-sm text-red-600 font-semibold mt-1">
                          Экономия {Number(p.oldPrice - p.price).toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                        onClick={() => openEdit(p)}
                      >
                        Редактировать
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors"
                        onClick={() => handleDelete(p.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                Товары не найдены
              </div>
            )}

            {isFormOpen && (
              <ProductForm
                initial={editing}
                onClose={() => { setIsFormOpen(false); }}
                onSaved={(prod) => {
                  setItems(prev => {
                    const exists = prev.find(x => x.id === prod.id);
                    if (exists) return prev.map(x => x.id === prod.id ? prod : x);
                    return [prod, ...prev];
                  });
                  setIsFormOpen(false);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProductForm({ initial, onClose, onSaved }: { initial?: Product | null, onClose: () => void, onSaved: (p: Product) => void }) {
  const [form, setForm] = useState<Product>(() => initial ? { 
    ...initial,
    meta: initial.meta || { title: '', description: '', keywords: [], ogImage: '' }
  } : {
    id: '', name: '', price: 0, image: '', additionalImages: [], specs: [], 
    type: 'regular', description: '', shortDesc: '', 
    meta: { title: '', description: '', keywords: [], ogImage: '' }
  });
  
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [activeMetaTab, setActiveMetaTab] = useState<'basic' | 'meta'>('basic');
  const [keywordsInput, setKeywordsInput] = useState('');

  useEffect(() => { 
    if (initial) {
      setForm({ 
        ...initial,
        meta: initial.meta || { title: '', description: '', keywords: [], ogImage: '' }
      }); 
      if (initial.meta?.keywords) {
        setKeywordsInput(Array.isArray(initial.meta.keywords) ? 
          initial.meta.keywords.join(', ') : 
          String(initial.meta.keywords));
      }
    }
  }, [initial]);

  function setField<K extends keyof Product>(k: K, v: Product[K]) { 
    setForm(prev => ({ ...prev, [k]: v })); 
  }

  function setMetaField<K extends keyof Product['meta']>(k: K, v: Product['meta'][K]) {
    setForm(prev => ({ 
      ...prev, 
      meta: { ...prev.meta, [k]: v } 
    })); 
  }

  function handleKeywordsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setKeywordsInput(value);
  }

  function handleKeywordsBlur() {
    if (keywordsInput.trim()) {
      const keywordsArray = keywordsInput
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);
      setMetaField('keywords', keywordsArray);
    } else {
      setMetaField('keywords', []);
    }
  }

  async function uploadImageToImgbb(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error?.message || 'Ошибка загрузки изображения');
      }
      
      return data.data.url;
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      throw new Error('Не удалось загрузить изображение');
    }
  }

  async function handleMainImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading('main');
    try {
      const imageUrl = await uploadImageToImgbb(file);
      setField('image', imageUrl);
    } catch (error: any) {
      alert(error.message || 'Ошибка загрузки изображения');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  async function handleOgImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading('ogImage');
    try {
      const imageUrl = await uploadImageToImgbb(file);
      setMetaField('ogImage', imageUrl);
    } catch (error: any) {
      alert(error.message || 'Ошибка загрузки изображения');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  async function handleAdditionalImagesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading('additional');
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadImageToImgbb(file))
      );
      
      setField('additionalImages', [...(form.additionalImages || []), ...uploadedUrls]);
    } catch (error: any) {
      alert(error.message || 'Ошибка загрузки изображений');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  function removeAdditionalImage(index: number) {
    const newImages = [...(form.additionalImages || [])];
    newImages.splice(index, 1);
    setField('additionalImages', newImages);
  }

  function getSpecsText(): string {
    if (!form.specs || form.specs.length === 0) return '';
    return Array.isArray(form.specs) ? form.specs.join('\n') : '';
  }

  function handleSpecsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setField('specs', [value]);
  }

  async function save() {
    setSaving(true);
    try {
      if (!form.name || !form.price) throw new Error('Заполните название и цену');

      if (keywordsInput.trim()) {
        const keywordsArray = keywordsInput
          .split(',')
          .map(k => k.trim())
          .filter(Boolean);
        setMetaField('keywords', keywordsArray);
      }

      const payload = { ...form };
      
      if (typeof payload.specs?.[0] === 'string') {
        payload.specs = payload.specs[0]
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);
      } else {
        payload.specs = payload.specs || [];
      }
      
      payload.additionalImages = payload.additionalImages || [];
      
      payload.meta = payload.meta || {};
      payload.meta.keywords = Array.isArray(payload.meta.keywords) ? 
        payload.meta.keywords : 
        (payload.meta.keywords ? [payload.meta.keywords] : []);

      let res;
      if (initial && initial.id) {
        res = await fetch(`https://svb-shop-back.onrender.com/api/products/${encodeURIComponent(initial.id)}`, { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(payload) 
        });
      } else {
        if (!payload.id) delete (payload as any).id;
        res = await fetch(`https://svb-shop-back.onrender.com/api/products`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(payload) 
        });
      }
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'server error');
      onSaved(data.product);
      alert('Сохранено');
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {initial ? 'Редактировать товар' : 'Создать товар'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 font-medium ${activeMetaTab === 'basic' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveMetaTab('basic')}
            >
              Основная информация
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeMetaTab === 'meta' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveMetaTab('meta')}
            >
              Мета-данные (SEO)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeMetaTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название товара *
                </label>
                <input 
                  value={form.name} 
                  onChange={e => setField('name', e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите название товара"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена *
                </label>
                <input 
                  type="number" 
                  value={String(form.price)} 
                  onChange={e => setField('price', Number(e.target.value))} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип товара
                </label>
                <select 
                  value={form.type} 
                  onChange={e => setField('type', e.target.value as Product["type"])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="regular">Обычный</option>
                  <option value="promotional">Акционный</option>
                  <option value="hit">Хит продаж</option>
                  <option value="new">Новая модель</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Старая цена (для акционных товаров)
                </label>
                <input 
                  type="number" 
                  value={form.oldPrice || ''} 
                  onChange={e => setField('oldPrice', e.target.value ? Number(e.target.value) : undefined)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Оставьте пустым, если нет скидки"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Короткое описание
                </label>
                <input 
                  value={form.shortDesc} 
                  onChange={e => setField('shortDesc', e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Краткое описание для карточки товара"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Полное описание
                </label>
                <textarea 
                  value={form.description} 
                  onChange={e => setField('description', e.target.value)} 
                  rows={4} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Подробное описание товара"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Главное изображение
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    disabled={uploading === 'main'}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {uploading === 'main' && (
                    <div className="text-sm text-blue-600">Загрузка изображения...</div>
                  )}
                  <input 
                    value={form.image} 
                    onChange={e => setField('image', e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Или вставьте URL изображения"
                  />
                  {form.image && (
                    <div className="mt-2">
                      <img 
                        src={form.image} 
                        className="w-32 h-32 object-cover rounded border"
                        alt="Предпросмотр" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительные изображения
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesUpload}
                    disabled={uploading === 'additional'}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {uploading === 'additional' && (
                    <div className="text-sm text-blue-600">Загрузка изображений...</div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {(form.additionalImages || []).map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          className="w-full h-24 object-cover rounded border"
                          alt={`Дополнительное изображение ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <textarea 
                    value={(form.additionalImages || []).join('\n')} 
                    onChange={e => setField('additionalImages', e.target.value.split('\n').map(s=>s.trim()).filter(Boolean))} 
                    rows={3} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Или вставьте URLs изображений (по одному на строку)"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Характеристики (по одной на строку)
                </label>
                <textarea 
                  value={getSpecsText()} 
                  onChange={handleSpecsChange} 
                  rows={4} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Процессор: Intel Core i5
Память: 8GB RAM
Экран: 15.6 дюймов"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Вводите характеристики, разделяя их переносом строки (Enter)
                </p>
              </div>
            </div>
          )}

          {activeMetaTab === 'meta' && (
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title *
                </label>
                <input 
                  value={form.meta?.title || ''} 
                  onChange={e => setMetaField('title', e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Заголовок для SEO (до 60 символов)"
                  maxLength={60}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {form.meta?.title?.length || 0}/60 символов
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description *
                </label>
                <textarea 
                  value={form.meta?.description || ''} 
                  onChange={e => setMetaField('description', e.target.value)} 
                  rows={3} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Описание для SEO (до 160 символов)"
                  maxLength={160}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {form.meta?.description?.length || 0}/160 символов
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ключевые слова (Keywords)
                </label>
                <textarea 
                  value={keywordsInput} 
                  onChange={handleKeywordsChange}
                  onBlur={handleKeywordsBlur}
                  rows={3} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите ключевые слова через запятую: smartphone, android, 5g, etc."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Вводите ключевые слова через запятую. Количество ключевых слов: {form.meta?.keywords?.length || 0}
                </p>
                {form.meta?.keywords && form.meta.keywords.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Текущие ключевые слова:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {form.meta.keywords.map((keyword:any, index:any) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Image (для социальных сетей)
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOgImageUpload}
                    disabled={uploading === 'ogImage'}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {uploading === 'ogImage' && (
                    <div className="text-sm text-blue-600">Загрузка изображения...</div>
                  )}
                  <input 
                    value={form.meta?.ogImage || ''} 
                    onChange={e => setMetaField('ogImage', e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="URL изображения для социальных сетей"
                  />
                  {form.meta?.ogImage && (
                    <div className="mt-2">
                      <img 
                        src={form.meta.ogImage} 
                        className="w-32 h-32 object-cover rounded border"
                        alt="OG Image preview" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Рекомендуемый размер: 1200×630 пикселей
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Советы по SEO:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Title должен быть уникальным для каждого товара</li>
                  <li>• Description должен кратко описывать основные преимущества</li>
                  <li>• Используйте релевантные ключевые слова</li>
                  <li>• OG Image будет отображаться при расшаривании в соцсетях</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${activeMetaTab === 'basic' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveMetaTab('basic')}
            >
              Основная информация
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${activeMetaTab === 'meta' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveMetaTab('meta')}
            >
              Мета-данные
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={onClose}
              disabled={saving || !!uploading}
            >
              Отмена
            </button>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              onClick={save}
              disabled={saving || !!uploading}
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}