'use client';
import { useState } from 'react';
import Image from 'next/image';

const AvatarPicker = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file);
    setError('');

    if (file) {
      // check by type
      if (!file.type.startsWith('image/')) {
        setError('Only images');
        return;
      }

      // check by size file
      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {previewUrl ? (
        <Image src={previewUrl} alt="Preview" width={300} height={300} />
      ) : (
        <label>
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
