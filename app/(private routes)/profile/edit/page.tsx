'use client';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';

const EditProfile = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [imageFile, setImageFile] = useState<File| null>(null)
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username || '');
      setAvatar(user.avatar || '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = await updateMe({ username, avatar: uploadImage });
    setUser(updatedUser);
    router.push('/profile');
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <AvatarPicker profilePhotoUrl={avatar} onChangePhoto={setImageFile} />
        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
