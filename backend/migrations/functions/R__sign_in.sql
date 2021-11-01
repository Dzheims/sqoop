CREATE OR REPLACE FUNCTION SIGNIN(user_name TEXT, password TEXT) RETURNS jwt_token AS
$$
DECLARE    
  token_information jwt_token;
BEGIN
    SELECT 'sqoop_user', id, username, extract(epoch from (now() + interval '1 week'))
    INTO token_information
    FROM users
    WHERE users.username = $1 
    AND users.hashed_password = crypt($2, users.hashed_password);
    RETURN token_information::jwt_token;
end;
$$ LANGUAGE PLPGSQL VOLATILE STRICT SECURITY DEFINER;
