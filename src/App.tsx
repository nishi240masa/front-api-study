// src/App.js
import { useState } from 'react';

const App = () => {
  const [birthday, setBirthday] = useState('');
  const [fortune, setFortune] = useState('');
  const [error, setError] = useState('');

  // APIリクエストを送信する関数
  const fetchFortune = async () => {
    if (!birthday) {
      setError('誕生日を入力してください。');
      return;
    }

    setError(''); // エラーをリセット

    try {
      const response = await fetch(`https://api-study-session.onrender.com/omikuji?birthday=${birthday}`);
      const data = await response.json();

      if (data.error) {
        // eslint-disable-next-line ts/no-unsafe-argument
        setError(data.error);
        setFortune('');
      } else {
        // eslint-disable-next-line ts/no-unsafe-argument
        setFortune(data.fortune);
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (err) {
      setError('サーバーとの接続に失敗しました。');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>おみくじアプリ</h1>

      <input
        type="date"
        value={birthday}
        onChange={(e) => {
          setBirthday(e.target.value);
        }}
        placeholder="誕生日を入力してください"
      />

      <button
        type="button"
        onClick={() => {
          void (async () => {
            await fetchFortune();
          })();
        }}
      >
        おみくじを引く
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fortune && (
        <div>
          <h2>おみくじの結果</h2>
          <p>{fortune}</p>
        </div>
      )}
    </div>
  );
};

export default App;
