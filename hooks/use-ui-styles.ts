import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface UIStyle {
  id: string
  element_name: string
  property: string
  value: number
  unit: string
  category: string
  label: string
  min_value: number
  max_value: number
}

export interface UIColor {
  id: string
  element_name: string
  property: string
  value: string
  category: string
  label: string
}

export interface UIToggle {
  id: string
  element_name: string
  enabled: boolean
  label: string
}

export function useUIStyles() {
  const [styles, setStyles] = useState<UIStyle[]>([])
  const [colors, setColors] = useState<UIColor[]>([])
  const [toggles, setToggles] = useState<UIToggle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUIStyles()
    fetchUIColors()
    fetchUIToggles()

    const stylesSubscription = supabase
      .channel('ui_styles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ui_styles' }, () => {
        fetchUIStyles()
      })
      .subscribe()

    const colorsSubscription = supabase
      .channel('ui_colors_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ui_colors' }, () => {
        fetchUIColors()
      })
      .subscribe()

    const togglesSubscription = supabase
      .channel('ui_toggles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ui_toggles' }, () => {
        fetchUIToggles()
      })
      .subscribe()

    return () => {
      stylesSubscription.unsubscribe()
      colorsSubscription.unsubscribe()
      togglesSubscription.unsubscribe()
    }
  }, [])

  async function fetchUIStyles() {
    const { data } = await supabase
      .from('ui_styles')
      .select('*')
      .order('category', { ascending: true })
      .order('element_name', { ascending: true })

    if (data) {
      const parsed = data.map(item => ({
        ...item,
        value: Number(item.value),
        min_value: Number(item.min_value),
        max_value: Number(item.max_value),
      }))
      setStyles(parsed)
    }
    setLoading(false)
  }

  async function fetchUIColors() {
    const { data } = await supabase
      .from('ui_colors')
      .select('*')
      .order('category', { ascending: true })
      .order('element_name', { ascending: true })

    if (data) {
      setColors(data)
    }
  }

  async function fetchUIToggles() {
    const { data } = await supabase
      .from('ui_toggles')
      .select('*')
      .order('label', { ascending: true })

    if (data) {
      setToggles(data)
    }
  }

  async function updateStyle(id: string, value: number) {
    setStyles(prev => prev.map(s => s.id === id ? { ...s, value } : s))

    const { error } = await supabase
      .from('ui_styles')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error updating style:', error)
      fetchUIStyles()
      throw error
    }
  }

  async function updateColor(id: string, value: string) {
    setColors(prev => prev.map(c => c.id === id ? { ...c, value } : c))

    const { error } = await supabase
      .from('ui_colors')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error updating color:', error)
      fetchUIColors()
      throw error
    }
  }

  async function updateToggle(id: string, enabled: boolean) {
    setToggles(prev => prev.map(t => t.id === id ? { ...t, enabled } : t))

    const { error } = await supabase
      .from('ui_toggles')
      .update({ enabled })
      .eq('id', id)

    if (error) {
      console.error('Error updating toggle:', error)
      fetchUIToggles()
      throw error
    }
  }

  return {
    styles,
    colors,
    toggles,
    loading,
    updateStyle,
    updateColor,
    updateToggle,
  }
}
