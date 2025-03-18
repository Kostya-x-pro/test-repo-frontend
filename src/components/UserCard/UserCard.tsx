import { createSignal } from 'solid-js';
import { updateUser } from '../../api/apiClient';
import Icon from '../Icon/Icon';

interface UserCardProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserCard = (props: UserCardProps) => {
  const {id, username, email} = props;
  const [name, setName] = createSignal(props.name);
  const [isEditing, setIsEditing] = createSignal(false);
  const [loaded, setLoaded] = createSignal(false);
  setTimeout(() => setLoaded(true), 500);

  const handleUpdate = async () => {
    try {
      await updateUser(id, { name: name() });
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка обновления:', err);
      alert('Ошибка при обновлении имени пользователя.');
    }
  };

  return (
    <div
      class={`p-4 bg-gray-200 rounded-lg shadow-md transition-all duration-500 transform ${
        loaded() ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <input
        type="text"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
        class={`w-full p-2 border rounded ${isEditing() ? 'border-blue-500' : 'border-gray-300'} transition-all`}
        disabled={!isEditing()}
      />
      <button
        class="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => (isEditing() ? handleUpdate() : setIsEditing(true))}
      >
        <Icon name={isEditing() ? 'save' : 'edit'}/>
        {isEditing() ? 'Сохранить' : 'Редактировать'}
      </button>
      <p class="text-gray-600 mt-2">@{username}</p>
      <p class="text-gray-500">{email}</p>
    </div>
  );
};

export default UserCard;
