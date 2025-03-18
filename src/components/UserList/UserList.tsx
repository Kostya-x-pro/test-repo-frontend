import { createQuery } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import { fetchUsers } from '../../api/apiClient';
import UserCard from '../UserCard/UserCard';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from '../Icon/Icon';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList = () => {
  const [page, setPage] = createSignal(0);
  const limit = 6;

  const query = createQuery(() => ['users', page()], () => fetchUsers(page() * limit, limit));
  return (
    <div class="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-black">Список пользователей</h2>

      {query.isLoading && <Spinner />}
      {query.isError && <ErrorMessage message="Ошибка загрузки данных" />}

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {query.data?.map((user: User) => (
          <UserCard {...user} />
        ))}
      </div>

      <div class="mt-6 flex justify-between">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page() === 0}
        >
          <Icon name="left" /> Назад
        </button>

        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Вперед <Icon name="right" />
        </button>
      </div>

      <button
        class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded mx-auto block"
        onClick={() => query.refetch()}
      >
        <Icon name="refresh" /> Обновить данные
      </button>
    </div>
  );
};

export default UserList;
