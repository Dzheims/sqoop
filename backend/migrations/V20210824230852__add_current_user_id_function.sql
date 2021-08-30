CREATE FUNCTION current_user_id() RETURNS INTEGER AS $$
  SELECT NULLIF(current_setting('jwt.claims.user_id', TRUE), '')::INTEGER;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION current_user_id() TO sqoop_user;