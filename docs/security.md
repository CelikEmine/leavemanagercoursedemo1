# Security

> **Bootstrap sırasında doldurulur.** Ajanların her plan ve review'da izleyeceği temel kurallar.

## Secrets
- Gizli veriler repo'ya, spec'lere, prompt'lara veya chat'e girmez. `.env` gitignore'da tutulur;
  `.env.example` sağlanır.
- Ajanlar debug sırasında bile gizli değerleri yazdırmaz.

## Input & output
- Girişler API sınırında doğrulanır.
- Hata yanıtları dahili ayrıntıları ve stack trace'leri kullanıcıya açmaz.
- İzin ve çalışan verilerinin saklama/şifreleme gereksinimleri ilk ilgili spec'te belirlenmelidir.

## AuthN / AuthZ
- Rol tabanlı yetkilendirme önerisi: `ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_EMPLOYEE`.
- Kimlik doğrulama sağlayıcısı henüz seçilmedi. Kurumsal kullanım için öneri OAuth2 / OpenID Connect;
  uygulama içi Spring Security + JWT seçeneği ayrıca değerlendirilebilir.
- Yetkilendirme varsayılanı reddet olmalıdır; kesin rol ve kaynak kapsamı feature spec'inde tanımlanır.
- Onay ve ret işlemleri için audit trail önerisi kabul edilmiştir; kaydedilecek alanlar spec'te tanımlanır.

## Dependencies
- Yeni bağımlılıklar için Spring tarafından önerilen kütüphaneler tercih edilir.
- Lisans, bakım durumu ve güvenlik açıkları değerlendirilir; CI'da bağımlılık taraması önerilmiştir.

## Review lens
Security is a mandatory dimension of every independent review (see `prompts/review.md`), not a
separate afterthought phase.
