# Yerel geliştirme

## Gereksinimler
- JDK 17
- Node.js 22 LTS ve npm
- Yerel PostgreSQL sunucusu
- Windows'ta `scripts/check` için Git Bash; uygulama başlatma komutları PowerShell'de çalışır.

Sürümleri doğrulayın:

```powershell
java -version
node --version
npm --version
```

PostgreSQL'de uygulama veritabanı ve rolünü oluşturun. Aşağıdaki parolayı kendi yerel
PostgreSQL parolanızla değiştirin:

```sql
CREATE ROLE leavemanager LOGIN PASSWORD 'replace-with-local-password';
CREATE DATABASE leavemanager OWNER leavemanager;
```

## Uygulamayı başlatma

1. Depo kökünden backend'i başlatın. `DATABASE_URL`, `DATABASE_USERNAME` ve `DATABASE_PASSWORD`
   değişkenleri varsayılan yerel bağlantı ayarlarını geçersiz kılar:

   ```powershell
   $env:DATABASE_URL = "jdbc:postgresql://localhost:5432/leavemanager"
   $env:DATABASE_USERNAME = "leavemanager"
   $env:DATABASE_PASSWORD = "replace-with-local-password"
   .\mvnw.cmd spring-boot:run
   ```

2. Ayrı bir terminalde frontend bağımlılıklarını kurup geliştirme sunucusunu çalıştırın:

   ```powershell
   Set-Location frontend
   npm ci
   npm run dev
   ```

3. `http://127.0.0.1:5173` adresini açın. PostgreSQL erişilemese readiness ekranı hazır
   durumunu göstermemelidir.

## Yerel doğrulama

Git Bash'i depo kökünde açıp hızlı profili çalıştırın:

```bash
./scripts/check --fast
```

Full profil PostgreSQL service container'ı ve Playwright browser'ı olan CI ortamında çalışır:

```bash
./scripts/check
```

Yerel full profil için container runtime kurulması gerekmez; full doğrulamanın kaynağı GitHub
Actions workflow'udur.
