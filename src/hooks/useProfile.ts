import { useState, useEffect } from 'react'
import { profileService } from '@/services/profileService'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

export function useProfile() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [savingName, setSavingName] = useState(false)
  const [changingPass, setChangingPass] = useState(false)

  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [stats, setStats] = useState({ total: 0, concluido: 0, emAndamento: 0 })

  useEffect(() => {
    if (profile?.name) setName(profile.name)
  }, [profile])

  useEffect(() => {
    let mounted = true
    const fetchStats = async () => {
      if (!user) return
      try {
        const data = await profileService.getStats(user.id)
        if (mounted) setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchStats()
    return () => {
      mounted = false
    }
  }, [user])

  const updateName = async () => {
    if (!user || !name.trim()) return
    setSavingName(true)
    try {
      await profileService.updateProfile(user.id, name.trim())
      await refreshProfile()
      toast({ title: 'Sucesso', description: 'Perfil atualizado com sucesso!', duration: 4000 })
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive', duration: 4000 })
    } finally {
      setSavingName(false)
    }
  }

  const updatePassword = async () => {
    if (!user || !user.email) return
    if (newPassword.length < 8) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 8 caracteres.',
        variant: 'destructive',
        duration: 4000,
      })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas nao conferem.',
        variant: 'destructive',
        duration: 4000,
      })
      return
    }

    setChangingPass(true)
    try {
      await profileService.changePassword(currentPassword, newPassword, user.email)
      toast({ title: 'Sucesso', description: 'Senha alterada com sucesso!', duration: 4000 })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive', duration: 4000 })
    } finally {
      setChangingPass(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast({ description: 'Sessao encerrada.', duration: 4000 })
  }

  return {
    user,
    profile,
    loading,
    stats,
    name,
    setName,
    updateName,
    savingName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    updatePassword,
    changingPass,
    handleSignOut,
  }
}
