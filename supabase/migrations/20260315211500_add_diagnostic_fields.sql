ALTER TABLE public.diagnoses
  ADD COLUMN IF NOT EXISTS client_role text,
  ADD COLUMN IF NOT EXISTS process_description text;
