import { useGetCurrentUserIdQuery } from './authentication.query.generated';

export default function currentUserId() {
  const CURRENT_USER_ID = useGetCurrentUserIdQuery().data
    ?.currentUserId as number;
  return CURRENT_USER_ID;
}
