import React, { useState } from 'react';
import './App.css';

const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی'];
const categories = ['همه', 'ملک مسکونی', 'ملک تجاری', 'ماشین', 'لوازم'];

const sampleAds = [
  { id: 1, title: 'فروش آپارتمان در تهران', province: 'تهران', category: 'ملک مسکونی', price: '3 میلیارد' },
  { id: 2, title: 'مزایده پژو 206', province: 'اصفهان', category: 'ماشین', price: '400 میلیون' },
  { id: 3, title: 'فروش مغازه در شیراز', province: 'فارس', category: 'ملک تجاری', price: '2.5 میلیارد' },
];

const provincePaths = {
  'تهران': 'M150,100 L180,100 L180,130 L150,130 Z',
  'اصفهان': 'M200,200 L230,200 L230,230 L200,230 Z',
  'فارس': 'M180,250 L210,250 L210,280 L180,280 Z',
  'خراسان رضوی': 'M250,100 L280,100 L280,130 L250,130 Z',
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('تهران');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  const filteredAds = sampleAds.filter(
    ad => ad.province === selectedProvince && (selectedCategory === 'همه' || ad.category === selectedCategory)
  );

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>ورود به حساب کاربری</h2>
        <input
          type="tel"
          placeholder="شماره موبایل خود را وارد کنید"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button onClick={() => setLoggedIn(true)}>ورود</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>نقشه مزایده‌های ایران</h2>

      <svg width="400" height="400" viewBox="0 0 400 400" style={{ border: '1px solid #ccc' }}>
        {Object.entries(provincePaths).map(([name, d]) => (
          <path
            key={name}
            d={d}
            fill={name === selectedProvince ? '#007bff' : '#ccc'}
            stroke="#333"
            strokeWidth="1"
            onClick={() => setSelectedProvince(name)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>

      <p>استان انتخاب‌شده: {selectedProvince}</p>

      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="ads">
        {filteredAds.length === 0 ? (
          <p>آگهی‌ای برای این فیلترها یافت نشد.</p>
        ) : (
          filteredAds.map(ad => (
            <div key={ad.id} className="ad">
              <h3>{ad.title}</h3>
              <p>استان: {ad.province} | دسته: {ad.category}</p>
              <p>قیمت پایه: {ad.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
