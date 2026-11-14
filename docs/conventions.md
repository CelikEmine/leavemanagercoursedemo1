# Konvansiyonlar

> **Bootstrap sırasında doldurulur.** Yalnızca kararlaştırılmış veya açıkça araçla uygulanan
> kurallar burada yer alır.

## Dil
- **Chat dili (görüşmeler, oturumlar):** Türkçe
- **Belge dili (docs/, specs, planlar, ADR'ler, review ve verify raporları):** Türkçe
- **Her zaman İngilizce (protokol, metin değil):** ANEW core dosyaları, template başlıkları ve alan etiketleri,
  `Status:` değerleri (Draft / Approved / In progress / Shipped), `Approved by / on:`, `Source:`.
- **Kod tanımlayıcıları, branch isimleri, commit mesajları:** İngilizce
- **Ajan mesajları (handoff özetleri, reddetmeler, `Next:` satırları):** Türkçe; komut adları, dosya
  yolları ve protokol alanları aynen.

## Dil & Framework Versiyonları
- **Java:** 17 LTS
- **Spring Boot:** 4.1.2 (Java 17 compatible; selected to stay on a supported release line)
- **PostgreSQL:** 17 (CI integration test service)
- **Node.js:** 22 LTS
- **React:** 18.3.1

## Araçla Uygulanan Kurallar
- Java biçimlendirme: Spotless + Google Java Format (`./mvnw spotless:check`).
- Frontend lint: ESLint; production build ayrıca TypeScript tür denetimini çalıştırır.
- Frontend testleri: Vitest/Testing Library; browser smoke: Playwright Chromium, tek worker.

## Adlandırma
- **Package:** `com.company.leavemanager.<module>` (önerilen paket kökü; şirket/organizasyon adı netleştirilecek)
- **Classes:** PascalCase
- **Methods/Fields:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Branch ve dosya adları:** İngilizce; branch şeması `docs/git.md` içindedir.

## Hata Yönetimi
- Özel exception'lar domain hatalarını temsil eder.
- Hata yanıtları dahili ayrıntıları kullanıcıya açmaz.
- Logging için SLF4J + Logback önerilmiştir; yapılandırma uygulama iskeletinde doğrulanacaktır.

## Data Kuralları
- Tarih/saat API temsili ISO 8601 olmalıdır.
- Java tarafında tarih ve saat için `LocalDate` / `LocalDateTime` kullanılmalıdır.
- Timezone ve kimlik biçimi henüz belirlenmedi.

## Bilinen Tuzaklar
Başlangıçta kayıtlı tuzak yoktur.

## Araçla Uygulanır
Henüz araç seçilmedi veya `scripts/check` içine bağlanmadı. Walking-skeleton spec'i araçları
seçip bu bölümü güncellemelidir.
