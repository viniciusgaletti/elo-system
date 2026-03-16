// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      diagnoses: {
        Row: {
          client_name: string
          client_role: string | null
          company_name: string
          created_at: string | null
          current_phase: string | null
          id: string
          process_description: string | null
          project_scope: string | null
          segment: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_name: string
          client_role?: string | null
          company_name?: string
          created_at?: string | null
          current_phase?: string | null
          id?: string
          process_description?: string | null
          project_scope?: string | null
          segment?: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_name?: string
          client_role?: string | null
          company_name?: string
          created_at?: string | null
          current_phase?: string | null
          id?: string
          process_description?: string | null
          project_scope?: string | null
          segment?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      diagnosticos: {
        Row: {
          client_name: string
          company_name: string | null
          consultant_id: string
          created_at: string | null
          current_phase: string | null
          enquadramento_completed: boolean | null
          final_observations: string | null
          id: string
          lancamento_completed: boolean | null
          otimizacao_completed: boolean | null
          process_description: string | null
          process_name: string | null
          role: string | null
          segment: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_name: string
          company_name?: string | null
          consultant_id: string
          created_at?: string | null
          current_phase?: string | null
          enquadramento_completed?: boolean | null
          final_observations?: string | null
          id?: string
          lancamento_completed?: boolean | null
          otimizacao_completed?: boolean | null
          process_description?: string | null
          process_name?: string | null
          role?: string | null
          segment?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_name?: string
          company_name?: string | null
          consultant_id?: string
          created_at?: string | null
          current_phase?: string | null
          enquadramento_completed?: boolean | null
          final_observations?: string | null
          id?: string
          lancamento_completed?: boolean | null
          otimizacao_completed?: boolean | null
          process_description?: string | null
          process_name?: string | null
          role?: string | null
          segment?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'diagnosticos_consultant_id_fkey'
            columns: ['consultant_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      enquadramento_data: {
        Row: {
          analysis_result: Json | null
          consultant_id: string
          created_at: string | null
          diagnostico_id: string
          id: string
          steps: Json | null
          updated_at: string | null
        }
        Insert: {
          analysis_result?: Json | null
          consultant_id: string
          created_at?: string | null
          diagnostico_id: string
          id?: string
          steps?: Json | null
          updated_at?: string | null
        }
        Update: {
          analysis_result?: Json | null
          consultant_id?: string
          created_at?: string | null
          diagnostico_id?: string
          id?: string
          steps?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'enquadramento_data_consultant_id_fkey'
            columns: ['consultant_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enquadramento_data_diagnostico_id_fkey'
            columns: ['diagnostico_id']
            isOneToOne: true
            referencedRelation: 'diagnosticos'
            referencedColumns: ['id']
          },
        ]
      }
      lancamento_data: {
        Row: {
          consultant_id: string
          created_at: string | null
          diagnostico_id: string
          id: string
          implementations: Json | null
          updated_at: string | null
        }
        Insert: {
          consultant_id: string
          created_at?: string | null
          diagnostico_id: string
          id?: string
          implementations?: Json | null
          updated_at?: string | null
        }
        Update: {
          consultant_id?: string
          created_at?: string | null
          diagnostico_id?: string
          id?: string
          implementations?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lancamento_data_consultant_id_fkey'
            columns: ['consultant_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lancamento_data_diagnostico_id_fkey'
            columns: ['diagnostico_id']
            isOneToOne: true
            referencedRelation: 'diagnosticos'
            referencedColumns: ['id']
          },
        ]
      }
      otimizacao_data: {
        Row: {
          consultant_id: string
          created_at: string | null
          diagnostico_id: string
          final_observations: string | null
          id: string
          measured_results: Json | null
          refinements: Json | null
          updated_at: string | null
        }
        Insert: {
          consultant_id: string
          created_at?: string | null
          diagnostico_id: string
          final_observations?: string | null
          id?: string
          measured_results?: Json | null
          refinements?: Json | null
          updated_at?: string | null
        }
        Update: {
          consultant_id?: string
          created_at?: string | null
          diagnostico_id?: string
          final_observations?: string | null
          id?: string
          measured_results?: Json | null
          refinements?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'otimizacao_data_consultant_id_fkey'
            columns: ['consultant_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'otimizacao_data_diagnostico_id_fkey'
            columns: ['diagnostico_id']
            isOneToOne: true
            referencedRelation: 'diagnosticos'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: diagnoses
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   client_name: text (not null)
//   project_scope: text (nullable)
//   current_phase: text (nullable, default: 'enquadramento'::text)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   company_name: text (not null, default: 'Empresa Não Definida'::text)
//   segment: text (not null, default: 'Geral'::text)
//   status: text (not null, default: 'em_andamento'::text)
//   client_role: text (nullable)
//   process_description: text (nullable)
// Table: diagnosticos
//   id: uuid (not null, default: gen_random_uuid())
//   consultant_id: uuid (not null)
//   client_name: text (not null)
//   company_name: text (nullable)
//   segment: text (nullable)
//   role: text (nullable)
//   process_name: text (nullable)
//   process_description: text (nullable)
//   status: text (nullable, default: 'em_andamento'::text)
//   current_phase: text (nullable, default: 'enquadramento'::text)
//   enquadramento_completed: boolean (nullable, default: false)
//   lancamento_completed: boolean (nullable, default: false)
//   otimizacao_completed: boolean (nullable, default: false)
//   final_observations: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: enquadramento_data
//   id: uuid (not null, default: gen_random_uuid())
//   diagnostico_id: uuid (not null)
//   consultant_id: uuid (not null)
//   steps: jsonb (nullable, default: '[]'::jsonb)
//   analysis_result: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: lancamento_data
//   id: uuid (not null, default: gen_random_uuid())
//   diagnostico_id: uuid (not null)
//   consultant_id: uuid (not null)
//   implementations: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: otimizacao_data
//   id: uuid (not null, default: gen_random_uuid())
//   diagnostico_id: uuid (not null)
//   consultant_id: uuid (not null)
//   measured_results: jsonb (nullable, default: '{}'::jsonb)
//   refinements: jsonb (nullable, default: '[]'::jsonb)
//   final_observations: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   name: text (nullable)
//   updated_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: diagnoses
//   CHECK diagnoses_current_phase_check: CHECK ((current_phase = ANY (ARRAY['enquadramento'::text, 'lancamento'::text, 'otimizacao'::text])))
//   PRIMARY KEY diagnoses_pkey: PRIMARY KEY (id)
//   CHECK diagnoses_status_check: CHECK ((status = ANY (ARRAY['em_andamento'::text, 'concluido'::text])))
//   FOREIGN KEY diagnoses_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: diagnosticos
//   FOREIGN KEY diagnosticos_consultant_id_fkey: FOREIGN KEY (consultant_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY diagnosticos_pkey: PRIMARY KEY (id)
// Table: enquadramento_data
//   FOREIGN KEY enquadramento_data_consultant_id_fkey: FOREIGN KEY (consultant_id) REFERENCES profiles(id) ON DELETE CASCADE
//   FOREIGN KEY enquadramento_data_diagnostico_id_fkey: FOREIGN KEY (diagnostico_id) REFERENCES diagnosticos(id) ON DELETE CASCADE
//   UNIQUE enquadramento_data_diagnostico_id_key: UNIQUE (diagnostico_id)
//   PRIMARY KEY enquadramento_data_pkey: PRIMARY KEY (id)
// Table: lancamento_data
//   FOREIGN KEY lancamento_data_consultant_id_fkey: FOREIGN KEY (consultant_id) REFERENCES profiles(id) ON DELETE CASCADE
//   FOREIGN KEY lancamento_data_diagnostico_id_fkey: FOREIGN KEY (diagnostico_id) REFERENCES diagnosticos(id) ON DELETE CASCADE
//   UNIQUE lancamento_data_diagnostico_id_key: UNIQUE (diagnostico_id)
//   PRIMARY KEY lancamento_data_pkey: PRIMARY KEY (id)
// Table: otimizacao_data
//   FOREIGN KEY otimizacao_data_consultant_id_fkey: FOREIGN KEY (consultant_id) REFERENCES profiles(id) ON DELETE CASCADE
//   FOREIGN KEY otimizacao_data_diagnostico_id_fkey: FOREIGN KEY (diagnostico_id) REFERENCES diagnosticos(id) ON DELETE CASCADE
//   UNIQUE otimizacao_data_diagnostico_id_key: UNIQUE (diagnostico_id)
//   PRIMARY KEY otimizacao_data_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: diagnosticos
//   Policy "Consultants manage own diagnosticos" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = consultant_id)
// Table: enquadramento_data
//   Policy "Consultants manage own enquadramento" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = consultant_id)
// Table: lancamento_data
//   Policy "Consultants manage own lancamento" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = consultant_id)
// Table: otimizacao_data
//   Policy "Consultants manage own otimizacao" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = consultant_id)
// Table: profiles
//   Policy "Users can update own profile" (UPDATE, PERMISSIVE) roles={public}
//     USING: (auth.uid() = id)
//   Policy "Users can view own profile" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = id)

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, name)
//     VALUES (
//       NEW.id,
//       NEW.email,
//       COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
//     );
//     RETURN NEW;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: enquadramento_data
//   CREATE UNIQUE INDEX enquadramento_data_diagnostico_id_key ON public.enquadramento_data USING btree (diagnostico_id)
// Table: lancamento_data
//   CREATE UNIQUE INDEX lancamento_data_diagnostico_id_key ON public.lancamento_data USING btree (diagnostico_id)
// Table: otimizacao_data
//   CREATE UNIQUE INDEX otimizacao_data_diagnostico_id_key ON public.otimizacao_data USING btree (diagnostico_id)
