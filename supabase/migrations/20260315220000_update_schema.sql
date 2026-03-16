-- Update profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create new Diagnosticos table
CREATE TABLE IF NOT EXISTS public.diagnosticos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT NOT NULL,
  company_name TEXT,
  segment TEXT,
  role TEXT,
  process_name TEXT,
  process_description TEXT,
  status TEXT DEFAULT 'em_andamento',
  current_phase TEXT DEFAULT 'enquadramento',
  enquadramento_completed BOOLEAN DEFAULT false,
  lancamento_completed BOOLEAN DEFAULT false,
  otimizacao_completed BOOLEAN DEFAULT false,
  final_observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create new Enquadramento Data table
CREATE TABLE IF NOT EXISTS public.enquadramento_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostico_id UUID REFERENCES public.diagnosticos(id) ON DELETE CASCADE NOT NULL UNIQUE,
  consultant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  steps JSONB DEFAULT '[]'::jsonb,
  analysis_result JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create new Lancamento Data table
CREATE TABLE IF NOT EXISTS public.lancamento_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostico_id UUID REFERENCES public.diagnosticos(id) ON DELETE CASCADE NOT NULL UNIQUE,
  consultant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  implementations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create new Otimizacao Data table
CREATE TABLE IF NOT EXISTS public.otimizacao_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostico_id UUID REFERENCES public.diagnosticos(id) ON DELETE CASCADE NOT NULL UNIQUE,
  consultant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  measured_results JSONB DEFAULT '{}'::jsonb,
  refinements JSONB DEFAULT '[]'::jsonb,
  final_observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure handle_new_user updates name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquadramento_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lancamento_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otimizacao_data ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
DO $$
BEGIN
  -- profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;

  -- diagnosticos
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Consultants manage own diagnosticos' AND tablename = 'diagnosticos') THEN
    CREATE POLICY "Consultants manage own diagnosticos" ON public.diagnosticos FOR ALL USING (auth.uid() = consultant_id);
  END IF;

  -- enquadramento_data
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Consultants manage own enquadramento' AND tablename = 'enquadramento_data') THEN
    CREATE POLICY "Consultants manage own enquadramento" ON public.enquadramento_data FOR ALL USING (auth.uid() = consultant_id);
  END IF;

  -- lancamento_data
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Consultants manage own lancamento' AND tablename = 'lancamento_data') THEN
    CREATE POLICY "Consultants manage own lancamento" ON public.lancamento_data FOR ALL USING (auth.uid() = consultant_id);
  END IF;

  -- otimizacao_data
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Consultants manage own otimizacao' AND tablename = 'otimizacao_data') THEN
    CREATE POLICY "Consultants manage own otimizacao" ON public.otimizacao_data FOR ALL USING (auth.uid() = consultant_id);
  END IF;
END $$;
