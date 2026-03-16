-- Add new columns to the diagnoses table safely
ALTER TABLE public.diagnoses
  ADD COLUMN IF NOT EXISTS company_name text NOT NULL DEFAULT 'Empresa Não Definida',
  ADD COLUMN IF NOT EXISTS segment text NOT NULL DEFAULT 'Geral',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'em_andamento' CHECK (status IN ('em_andamento', 'concluido'));

-- Seed data for testing
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Try to get the first available user (should be the admin seed user)
  SELECT id INTO v_user_id FROM auth.users ORDER BY created_at ASC LIMIT 1;

  -- If a user exists, we seed the initial project data for the dashboard
  IF v_user_id IS NOT NULL THEN
    INSERT INTO public.diagnoses (id, user_id, client_name, company_name, segment, status, current_phase, project_scope)
    VALUES
      (gen_random_uuid(), v_user_id, 'Ana Silva', 'Company A', 'Varejo', 'em_andamento', 'enquadramento', 'Otimização de processos logísticos com IA.'),
      (gen_random_uuid(), v_user_id, 'Carlos Oliveira', 'Company B', 'Saúde', 'concluido', 'otimizacao', 'Automação no agendamento e triagem de pacientes.'),
      (gen_random_uuid(), v_user_id, 'Mariana Santos', 'Company C', 'Educação', 'em_andamento', 'lancamento', 'Sistema de tutoria inteligente personalizado para alunos.'),
      (gen_random_uuid(), v_user_id, 'Pedro Costa', 'Company D', 'Tecnologia', 'em_andamento', 'enquadramento', 'Integração de LLMs no fluxo de atendimento B2B.');
  END IF;
END $$;
