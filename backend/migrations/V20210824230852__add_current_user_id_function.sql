CREATE FUNCTION current_user_id ()
  RETURNS integer
  AS $$
  SELECT
    NULLIF (Current_setting('jwt.claims.user_id', TRUE), '')::integer;

$$
LANGUAGE SQL
STABLE;

-- GRANT EXECUTE ON FUNCTION current_user_id() TO sqoop_user;
