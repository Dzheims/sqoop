CREATE FUNCTION current_user_id() RETURNS INTEGER AS $$
  SELECT NULLIF(current_setting('jwt.claims.id', TRUE), '')::INTEGER;
$$ LANGUAGE SQL STABLE;