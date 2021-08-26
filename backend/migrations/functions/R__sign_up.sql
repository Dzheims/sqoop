CREATE OR REPLACE FUNCTION SIGNUP(user_name text, PASSWORD TEXT) RETURNS jwt_token AS 
$$
DECLARE
  token_information jwt_token;
BEGIN
  INSERT INTO users (username, hashed_password)
    VALUES ($1, crypt($2, gen_salt('bf', 8)));
  SELECT
    'sqoop_user',
    user_id,
    username,
    extract(epoch from (now() + interval '1 week')) INTO token_information
  FROM
    users
  WHERE
    users.username = $1;
  RETURN token_information::jwt_token;
END;
$$
LANGUAGE PLPGSQL
VOLATILE
SECURITY DEFINER;