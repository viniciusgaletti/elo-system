ALTER TABLE public.diagnoses DROP CONSTRAINT IF EXISTS diagnoses_current_phase_check;
ALTER TABLE public.diagnoses ADD CONSTRAINT diagnoses_current_phase_check CHECK (current_phase = ANY (ARRAY['enquadramento'::text, 'lancamento'::text, 'otimizacao'::text]));

ALTER TABLE public.diagnoses DROP CONSTRAINT IF EXISTS diagnoses_status_check;
ALTER TABLE public.diagnoses ADD CONSTRAINT diagnoses_status_check CHECK (status = ANY (ARRAY['em_andamento'::text, 'concluido'::text]));
