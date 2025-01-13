import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/useToast';
import { DeleteConfirmationDialog } from '@/components/admin/delete-confirmation-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  ImagePlus, 
  Settings,
  LogOut,
  Menu,
  Search,
  Plus,
  Trash2,
  Edit,
  Globe
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SuccessStoryDialog } from '@/components/admin/success-story-dialog';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { SuccessStoriesTable } from '@/components/admin/success-stories-table';

interface SuccessStory {
  id: string;
  type: string;
  before_image: string;
  after_image: string;
  timeframe: string;
  grafts: number;
  age: number;
  video_id: string | null;
  patient_name: string;
  patient_country: string;
  rating: number;
  testimonial: string;
  created_at: string;
}

interface HairAnalysis {
  id: string;
  gender: string;
  age_range: { min: number; max: number | null };
  hair_loss_type: string;
  hair_loss_duration: string;
  previous_transplants: boolean;
  medical_conditions: string[];
  medications: string[];
  allergies: string[];
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [successStories, setSuccessStories] = React.useState<SuccessStory[]>([]);
  const [hairAnalyses, setHairAnalyses] = React.useState<HairAnalysis[]>([]);
  const [showSuccessStoryDialog, setShowSuccessStoryDialog] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<SuccessStory | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [storyToDelete, setStoryToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    checkUser();
  }, []);
  
  React.useEffect(() => {
    if (!loading) {
      fetchSuccessStories();
      fetchHairAnalyses();
    }
  }, [loading]);

  const fetchSuccessStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuccessStories(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Başarı hikayeleri yüklenirken bir hata oluştu",
      });
    }
  };

  const fetchHairAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('hair_analysis_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHairAnalyses(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Saç analizi başvuruları yüklenirken bir hata oluştu",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setStoryToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!storyToDelete) return;

    try {
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', storyToDelete);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Başarı hikayesi silindi",
      });

      fetchSuccessStories();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Başarı hikayesi silinirken bir hata oluştu",
      });
    }
  };

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/admin/login');
        return;
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error('Profile check failed');
      }

      if (!profile || profile.role !== 'admin') {
        throw new Error('Yetkisiz erişim');
      }
    } catch (error) {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
      toast({
        title: "Başarılı",
        description: "Çıkış yapıldı",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: error.message || "Çıkış yapılamadı",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <nav className="flex flex-col gap-4">
                  <Button variant="ghost" className="justify-start gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Başvurular
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <ImagePlus className="h-4 w-4" />
                    Başarı Hikayeleri
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Ayarlar
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/admin" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-5 w-5" />
              <span>Admin Panel</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Çıkış Yap</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex h-[calc(100vh-3.5rem)] w-[240px] flex-col border-r">
          <nav className="grid gap-2 p-4 text-sm">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              className="justify-start gap-2"
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'hair-analysis' ? 'secondary' : 'ghost'} 
              className="justify-start gap-2"
              onClick={() => setActiveTab('hair-analysis')}
            >
              <Users className="h-4 w-4" />
              Başvurular
            </Button>
            <Button 
              variant={activeTab === 'success-stories' ? 'secondary' : 'ghost'} 
              className="justify-start gap-2"
              onClick={() => setActiveTab('success-stories')}
            >
              <ImagePlus className="h-4 w-4" />
              Başarı Hikayeleri
            </Button>
            <Button 
              variant={activeTab === 'seo' ? 'secondary' : 'ghost'} 
              className="justify-start gap-2"
              onClick={() => setActiveTab('seo')}
            >
              <Globe className="h-4 w-4" />
              SEO Yönetimi
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
              className="justify-start gap-2"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4" />
              Ayarlar
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold">Yönetim Paneli</h1>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ara..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="gap-2"
                  onClick={() => {
                    setSelectedStory(null);
                    setShowSuccessStoryDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Yeni Ekle
                </Button>
              </div>
            </div>

            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Toplam Başvuru</p>
                        <h3 className="text-2xl font-bold">{hairAnalyses.length}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <ImagePlus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Başarı Hikayeleri</p>
                        <h3 className="text-2xl font-bold">{successStories.length}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Stories */}
            {activeTab === 'success-stories' && (
              <div className="space-y-4">
                <SuccessStoriesTable
                  stories={successStories}
                  onEdit={(story) => {
                    setSelectedStory(story);
                    setShowSuccessStoryDialog(true);
                  }}
                  onDelete={handleDeleteClick}
                  onRefresh={fetchSuccessStories}
                />
              </div>
            )}

            {/* Hair Analysis */}
            {activeTab === 'hair-analysis' && (
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad Soyad</TableHead>
                        <TableHead>İletişim</TableHead>
                        <TableHead>Cinsiyet</TableHead>
                        <TableHead>Yaş</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hairAnalyses
                        .filter(analysis => 
                          `${analysis.first_name} ${analysis.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          analysis.email.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((analysis) => (
                          <TableRow key={analysis.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {analysis.first_name} {analysis.last_name}
                                </span>
                                <span className="text-sm text-muted-foreground">{analysis.country}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{analysis.email}</span>
                                <span className="text-sm text-muted-foreground">{analysis.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {analysis.gender === 'male' ? 'Erkek' : 'Kadın'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {analysis.age_range.max 
                                ? `${analysis.age_range.min}-${analysis.age_range.max}`
                                : `${analysis.age_range.min}+`
                              }
                            </TableCell>
                            <TableCell>
                              {format(new Date(analysis.created_at), 'dd MMM yyyy', { locale: tr })}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* SEO Management */}
            {activeTab === 'seo' && (
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Meta Etiketleri</h2>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Başlık</Label>
                        <Input placeholder="Sayfa başlığı" />
                      </div>
                      <div className="space-y-2">
                        <Label>Açıklama</Label>
                        <Input placeholder="Sayfa açıklaması" />
                      </div>
                      <div className="space-y-2">
                        <Label>Anahtar Kelimeler</Label>
                        <Input placeholder="Anahtar kelimeler (virgülle ayırın)" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Sosyal Medya</h2>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>OG Başlık</Label>
                        <Input placeholder="Sosyal medya başlığı" />
                      </div>
                      <div className="space-y-2">
                        <Label>OG Açıklama</Label>
                        <Input placeholder="Sosyal medya açıklaması" />
                      </div>
                      <div className="space-y-2">
                        <Label>OG Resim URL</Label>
                        <Input placeholder="Sosyal medya resim URL'i" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full sm:w-auto">
                    SEO Ayarlarını Kaydet
                  </Button>
                </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Ayarlar</h2>
                <p className="text-muted-foreground">Ayarlar yakında eklenecek...</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Success Story Dialog */}
      <SuccessStoryDialog
        open={showSuccessStoryDialog}
        onOpenChange={setShowSuccessStoryDialog}
        initialData={selectedStory}
        onSuccess={() => {
          fetchSuccessStories();
          setShowSuccessStoryDialog(false);
        }}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
      />
    </div>
  );
}