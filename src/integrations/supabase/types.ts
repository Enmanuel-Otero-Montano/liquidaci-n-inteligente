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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      moderation_history: {
        Row: {
          action: string
          admin_id: string | null
          admin_name: string
          created_at: string
          id: string
          product_id: string
          reason: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          product_id: string
          reason?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          product_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          delivery_type: Database["public"]["Enums"]["delivery_type"]
          description: string
          discount_pct: number
          evidence_url: string | null
          id: string
          images: string[]
          liquidation_reason: string | null
          location: string
          offers_shipping: boolean
          pickup_address: string | null
          pickup_hours: string | null
          price_before: number
          price_now: number
          quantity_promo: Json | null
          seller_id: string
          shipping_cost: number | null
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          stock_qty: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          delivery_type?: Database["public"]["Enums"]["delivery_type"]
          description?: string
          discount_pct?: number
          evidence_url?: string | null
          id?: string
          images?: string[]
          liquidation_reason?: string | null
          location?: string
          offers_shipping?: boolean
          pickup_address?: string | null
          pickup_hours?: string | null
          price_before?: number
          price_now?: number
          quantity_promo?: Json | null
          seller_id: string
          shipping_cost?: number | null
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          stock_qty?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          delivery_type?: Database["public"]["Enums"]["delivery_type"]
          description?: string
          discount_pct?: number
          evidence_url?: string | null
          id?: string
          images?: string[]
          liquidation_reason?: string | null
          location?: string
          offers_shipping?: boolean
          pickup_address?: string | null
          pickup_hours?: string | null
          price_before?: number
          price_now?: number
          quantity_promo?: Json | null
          seller_id?: string
          shipping_cost?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          stock_qty?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      report_actions: {
        Row: {
          action: string
          admin_id: string | null
          admin_name: string
          created_at: string
          id: string
          note: string | null
          report_id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          note?: string | null
          report_id: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          note?: string | null
          report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_actions_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          product_id: string
          reason: string
          reporter_email: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["report_status"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          product_id: string
          reason: string
          reporter_email?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          product_id?: string
          reason?: string
          reporter_email?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          buyer_contact: string
          buyer_contact_type: string
          buyer_name: string
          created_at: string
          id: string
          note: string | null
          product_id: string
          quantity: number
          seller_id: string
          seller_notes: string | null
          status: Database["public"]["Enums"]["reservation_status"]
          updated_at: string
        }
        Insert: {
          buyer_contact: string
          buyer_contact_type?: string
          buyer_name: string
          created_at?: string
          id?: string
          note?: string | null
          product_id: string
          quantity?: number
          seller_id: string
          seller_notes?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
        }
        Update: {
          buyer_contact?: string
          buyer_contact_type?: string
          buyer_name?: string
          created_at?: string
          id?: string
          note?: string | null
          product_id?: string
          quantity?: number
          seller_id?: string
          seller_notes?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_actions: {
        Row: {
          action: string
          admin_id: string | null
          admin_name: string
          created_at: string
          id: string
          metadata: Json | null
          reason: string | null
          seller_id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          seller_id: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          admin_name?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seller_actions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          created_at: string
          direccion: string | null
          email: string
          horario_retiro: string | null
          id: string
          is_verified: boolean
          nombre_comercial: string
          politicas: string | null
          profile_image_url: string | null
          responsable: string | null
          status: Database["public"]["Enums"]["seller_status"]
          telefono: string
          updated_at: string
          user_id: string
          verified_at: string | null
          verified_by: string | null
          whatsapp_message: string | null
          zona: string
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          email?: string
          horario_retiro?: string | null
          id?: string
          is_verified?: boolean
          nombre_comercial?: string
          politicas?: string | null
          profile_image_url?: string | null
          responsable?: string | null
          status?: Database["public"]["Enums"]["seller_status"]
          telefono?: string
          updated_at?: string
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
          whatsapp_message?: string | null
          zona?: string
        }
        Update: {
          created_at?: string
          direccion?: string | null
          email?: string
          horario_retiro?: string | null
          id?: string
          is_verified?: boolean
          nombre_comercial?: string
          politicas?: string | null
          profile_image_url?: string | null
          responsable?: string | null
          status?: Database["public"]["Enums"]["seller_status"]
          telefono?: string
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
          whatsapp_message?: string | null
          zona?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          categorias: string[]
          contacto: string
          created_at: string
          frecuencia: string
          id: string
          metodo_contacto: string
          nombre: string
          zona: string
        }
        Insert: {
          categorias?: string[]
          contacto: string
          created_at?: string
          frecuencia?: string
          id?: string
          metodo_contacto?: string
          nombre: string
          zona?: string
        }
        Update: {
          categorias?: string[]
          contacto?: string
          created_at?: string
          frecuencia?: string
          id?: string
          metodo_contacto?: string
          nombre?: string
          zona?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: { Args: { title: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_seller_owner: { Args: { _seller_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      delivery_type: "pickup" | "shipping" | "both"
      product_status:
        | "draft"
        | "pending"
        | "approved"
        | "rejected"
        | "disabled"
        | "changes_requested"
      report_status: "open" | "resolved"
      reservation_status: "new" | "contacted" | "closed" | "lost"
      seller_status: "active" | "pending" | "suspended"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
      delivery_type: ["pickup", "shipping", "both"],
      product_status: [
        "draft",
        "pending",
        "approved",
        "rejected",
        "disabled",
        "changes_requested",
      ],
      report_status: ["open", "resolved"],
      reservation_status: ["new", "contacted", "closed", "lost"],
      seller_status: ["active", "pending", "suspended"],
    },
  },
} as const
