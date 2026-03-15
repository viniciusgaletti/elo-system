CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT NOT NULL,
  project_scope TEXT,
  current_phase TEXT DEFAULT 'enquadramento' CHECK (current_phase IN ('enquadramento', 'lancamento', 'otimizacao')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed an admin user
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  new_user_id := gen_random_uuid();
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@example.com',
    crypt('StrongPassword123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin Consultor"}',
    false, 'authenticated', 'authenticated',
    '', '', '', '', '',
    NULL, '', '', ''
  );

  INSERT INTO public.diagnoses (user_id, client_name, project_scope, current_phase)
  VALUES 
    (new_user_id, 'TechNova Solutions', 'Implementação de IA em RH', 'enquadramento'),
    (new_user_id, 'AgroCorp', 'Otimização de Cadeia de Suprimentos', 'lancamento'),
    (new_user_id, 'FinServe Banq', 'Análise Preditiva de Risco', 'otimizacao');
END $$;
