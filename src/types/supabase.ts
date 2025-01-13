export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      success_stories: {
        Row: {
          id: string
          type: string
          before_image: string
          after_image: string
          timeframe: string
          grafts: number
          age: number
          video_id: string | null
          patient_name: string
          patient_country: string
          rating: number
          testimonial: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          before_image: string
          after_image: string
          timeframe: string
          grafts: number
          age: number
          video_id?: string | null
          patient_name: string
          patient_country: string
          rating: number
          testimonial: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          before_image?: string
          after_image?: string
          timeframe?: string
          grafts?: number
          age?: number
          video_id?: string | null
          patient_name?: string
          patient_country?: string
          rating?: number
          testimonial?: string
          created_at?: string
          updated_at?: string
        }
      }
      hair_analysis_submissions: {
        Row: {
          id: string
          gender: string
          age_range: Json
          hair_loss_type: string
          hair_loss_duration: string
          previous_transplants: boolean
          previous_transplant_details: Json | null
          medical_conditions: string[]
          medications: string[]
          allergies: string[]
          photos: Json | null
          first_name: string
          last_name: string
          email: string
          phone: string
          country: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gender: string
          age_range: Json
          hair_loss_type: string
          hair_loss_duration: string
          previous_transplants: boolean
          previous_transplant_details?: Json | null
          medical_conditions: string[]
          medications: string[]
          allergies: string[]
          photos?: Json | null
          first_name: string
          last_name: string
          email: string
          phone: string
          country: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gender?: string
          age_range?: Json
          hair_loss_type?: string
          hair_loss_duration?: string
          previous_transplants?: boolean
          previous_transplant_details?: Json | null
          medical_conditions?: string[]
          medications?: string[]
          allergies?: string[]
          photos?: Json | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          country?: string
          created_at?: string
          updated_at?: string
        }
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
  }
}