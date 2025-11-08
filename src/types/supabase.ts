export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      _health: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: number
          description: string | null
          id: number
          related_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: number
          description?: string | null
          id?: number
          related_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: number
          description?: string | null
          id?: number
          related_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          content: string
          created_at: number
          id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: number
          id?: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: number
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      feedback_credits: {
        Row: {
          created_at: number
          credits_awarded: number
          feedback_id: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: number
          credits_awarded?: number
          feedback_id: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: number
          credits_awarded?: number
          feedback_id?: number
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      fengshui_advice: {
        Row: {
          advice: string | null
          created_at: number
          direction: string
          full_prompt: string | null
          id: string
          layout_id: string | null
          layout_image_url: string | null
          title: string | null
          updated_at: number
          user_id: string
        }
        Insert: {
          advice?: string | null
          created_at?: number
          direction: string
          full_prompt?: string | null
          id?: string
          layout_id?: string | null
          layout_image_url?: string | null
          title?: string | null
          updated_at?: number
          user_id: string
        }
        Update: {
          advice?: string | null
          created_at?: number
          direction?: string
          full_prompt?: string | null
          id?: string
          layout_id?: string | null
          layout_image_url?: string | null
          title?: string | null
          updated_at?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fengshui_advice_layout_id_fkey"
            columns: ["layout_id"]
            isOneToOne: false
            referencedRelation: "room_layouts"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: number
          currency: string | null
          id: number
          plan_id: number | null
          status: string
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: number
          currency?: string | null
          id?: number
          plan_id?: number | null
          status: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: number
          currency?: string | null
          id?: number
          plan_id?: number | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: number
          credits: number
          duration: string | null
          id: number
          is_active: boolean | null
          original_price: number | null
          price: number | null
          rank_name: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          updated_at: number
        }
        Insert: {
          created_at?: number
          credits?: number
          duration?: string | null
          id?: number
          is_active?: boolean | null
          original_price?: number | null
          price?: number | null
          rank_name: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: number
        }
        Update: {
          created_at?: number
          credits?: number
          duration?: string | null
          id?: number
          is_active?: boolean | null
          original_price?: number | null
          price?: number | null
          rank_name?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: number
        }
        Relationships: []
      }
      room_layouts: {
        Row: {
          canvas_data: Json
          created_at: number
          id: string
          name: string
          preview_url: string | null
          updated_at: number
          user_id: string
        }
        Insert: {
          canvas_data: Json
          created_at?: number
          id?: string
          name: string
          preview_url?: string | null
          updated_at?: number
          user_id: string
        }
        Update: {
          canvas_data?: Json
          created_at?: number
          id?: string
          name?: string
          preview_url?: string | null
          updated_at?: number
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          canceled_at: number | null
          created_at: number
          current_period_end: number | null
          current_period_start: number | null
          id: number
          plan_id: number | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: number
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: number
          current_period_end?: number | null
          current_period_start?: number | null
          id?: number
          plan_id?: number | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: number
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: number
          current_period_end?: number | null
          current_period_start?: number | null
          id?: number
          plan_id?: number | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          available_credits: number
          created_at: number
          feedback_earned_credits: number
          id: number
          invite_earned_credits: number
          plan_rank: string | null
          reset_at: number | null
          total_credits: number
          updated_at: number
          used_credits: number
          user_id: string
        }
        Insert: {
          available_credits?: number
          created_at?: number
          feedback_earned_credits?: number
          id?: number
          invite_earned_credits?: number
          plan_rank?: string | null
          reset_at?: number | null
          total_credits?: number
          updated_at?: number
          used_credits?: number
          user_id: string
        }
        Update: {
          available_credits?: number
          created_at?: number
          feedback_earned_credits?: number
          id?: number
          invite_earned_credits?: number
          plan_rank?: string | null
          reset_at?: number | null
          total_credits?: number
          updated_at?: number
          used_credits?: number
          user_id?: string
        }
        Relationships: []
      }
      user_invitations: {
        Row: {
          created_at: number
          credits_awarded: number | null
          expires_at: number
          id: number
          invite_code: string
          invite_url: string | null
          invited_email: string | null
          invited_user_id: string | null
          inviter_id: string
          status: number
          used_at: number | null
        }
        Insert: {
          created_at?: number
          credits_awarded?: number | null
          expires_at: number
          id?: number
          invite_code: string
          invite_url?: string | null
          invited_email?: string | null
          invited_user_id?: string | null
          inviter_id: string
          status?: number
          used_at?: number | null
        }
        Update: {
          created_at?: number
          credits_awarded?: number | null
          expires_at?: number
          id?: number
          invite_code?: string
          invite_url?: string | null
          invited_email?: string | null
          invited_user_id?: string | null
          inviter_id?: string
          status?: number
          used_at?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_invitations: { Args: never; Returns: number }
      get_user_credit_stats: {
        Args: { p_user_id: string }
        Returns: {
          available_credits: number
          feedback_earned_credits: number
          invite_earned_credits: number
          pending_invitations: number
          successful_invitations: number
          total_credits: number
          total_invitations: number
          used_credits: number
        }[]
      }
      test_database_setup: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
