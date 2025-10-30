'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';

type Props = {
  profilePhotoUrl?: string;
  onChangePhoto?: (file: File | null) => void;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
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

      onChangePhoto(file); // pass the file to the parent component

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        } else {
          setPreviewUrl('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl('');
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image src={previewUrl} alt="Preview" width={300} height={300} className={css.avatar} />
        )}
        <label className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}>
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} className={css.input} />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
