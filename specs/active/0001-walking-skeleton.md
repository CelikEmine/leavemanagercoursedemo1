# Spec 0001 — Walking Skeleton

- Status: In progress
- Mode: lite
- Plan: `specs/plans/0001-plan.md`
- Self-critique: done

## Intent
Leave Manager üzerinde çalışacak geliştiricilerin, temiz bir checkout'tan uygulamayı yerel
olarak başlatıp uçtan uca çalışan en küçük dilimi görebilmesi gerekir. Bu dilim, arayüzün
backend'e ve backend'in PostgreSQL'e erişebildiğini anlaşılır biçimde göstermelidir. Başarı,
teknoloji yığınının ve test/doğrulama komutlarının tekrarlanabilir biçimde çalışmasıdır.
İzin talebi veya onay işlevleri bu çalışmanın parçası değildir.

## Requirements
- Geliştirici, belgelenmiş yerel başlatma adımlarını izleyerek uygulamayı çalıştırabilir.
- Açılış ekranı, uygulamanın adını ve backend ile veritabanının hazır olup olmadığını gösterir.
- Sistem hazır değilken ekran bunu açıkça belirtir; hazır değilken başarı durumu göstermez.
- Doğrulama komutları hızlı geri bildirim ve tam kanıt profillerini destekler; ilgili testler
  profiller arasında eksiksiz ve çakışmasız biçimde kapsanır.
- Kontroller tamamlandığında başlatılan süreçler ve test verileri sonraki çalıştırmaya sızmaz.

## User experience
- **Flow:** Geliştirici yerel uygulamayı başlatır ve ana ekranı açar. Ekran, servislerin
  hazırlanması sırasında yükleniyor durumunu; backend ile veritabanı hazır olduğunda hazır
  durumunu; ikisinden biri erişilemez olduğunda kullanılamıyor durumunu gösterir.
- **States:** Ana ekran için yükleniyor, hazır ve kullanılamıyor durumları.
- **Design reference:** none — the flow above is the design.
- **Accessibility:** Durum metinle ifade edilir; klavye ile erişilebilir ve ekran okuyucuya
  sunulur. Renk tek başına durum belirtmez.

## Constraints & out of scope
- Stack: Java 17 LTS, Spring Boot 4.1.2, PostgreSQL ve React. Node/test araçları ve
  PostgreSQL/React sürümleri PLAN aşamasında önerilip onaylanır.
- **Spring Boot support decision (user-approved, 2026-11-07):** replace the originally selected
  2.7 line, which is outside the upstream minor-version support window, with the supported 4.1.2
  release. Official system requirements confirm Spring Boot 4.x requires Java 17 or newer.
- **R-13 environment decision (user-approved, 2026-11-07):** `fast` profile runs locally;
  `full` profile (including PostgreSQL integration and E2E tests) runs in CI with a PostgreSQL
  service container. This machine is not required to run `full`; `scripts/doctor` must report
  the per-profile verdict accurately. CI is the source of the full-green evidence.
- PLAN, yürütme ortamının `scripts/doctor` profil kararını ve unmet prerequisites listesini
  raporlar. PLAN'da kararlaştırılan hızlı/tam profiller ve test kapsamı BUILD'de doğrulanır.
- **E2E kapsamı önerisi:** Tek bir browser smoke journey, hazır ve kullanılamıyor durumlarını
  doğrular; toplam bütçe en fazla 2 dakikadır. Human onayı gerekir; test aracı PLAN'da seçilir.
- Yerel geliştirme ve doğrulama dışında deployment bu spec'in kapsamı dışındadır.
- Kimlik doğrulama, çalışan verisi, izin türleri, izin bakiyesi, talep oluşturma ve onay akışı
  bu spec'in kapsamı dışındadır.
- Mimari modül sınırları ve yasak bağımlılıklar backlog'daki B-1 kararıyla birlikte PLAN'da
  ele alınır; kapsam genişletilmez.

## Acceptance criteria
- [ ] AC-1 — Temiz checkout'tan başlayarak belgelenmiş adımlar, geliştiricinin arayüzü ve gerekli servisleri yerel ortamda çalıştırmasına yeterlidir.
- [ ] AC-2 — Backend ve PostgreSQL hazır olduğunda ana ekran Leave Manager adını ve hazır durumunu gösterir.
- [ ] AC-3 — Başlangıç ve servis/DB erişilememe durumlarında ana ekran uygun metinsel durumu gösterir; erişilemeyen servis için hazır sonucu göstermez.
- [ ] AC-4 — Klavye ve ekran okuyucu kullanan geliştirici yükleniyor, hazır ve kullanılamıyor durumlarını ayırt edebilir.
- [ ] AC-5 — `scripts/check --fast` hızlı profile ait derleme ve testleri; `scripts/check` ise hızlı profile ek olarak kalan integration ve E2E testlerini çalıştırır; hiçbir test atlanmaz veya iki profilde birden sayılmaz.
- [ ] AC-6 — Her iki check profili temiz test/veri durumuyla çalışır ve tamamlandığında kendi başlattığı süreçleri, servisleri ve test verisini temizler.
- [ ] AC-7 — `scripts/doctor` her profilin bu makinede çalışabilirlik kararını ve unmet prerequisites durumunu raporlar; check adımları CI'da da tanımlı toolchain ile çalıştırılabilir.

## Definition of Done
- [ ] Every acceptance criterion mapped to proof (test or reproducible observation)
- [ ] `scripts/check` green
- [ ] Independent review done; real findings fixed, noise rejected with written rationale, deferred ones in `specs/backlog.md`
- [ ] Docs / ADRs updated if behavior or architecture changed
- [ ] Spec moved to `specs/done/` (it becomes immutable there)

## Scorecard (fill at ship — honest numbers make the process improvable)
| Metric | Value |
|---|---|
| Spec revisions | |
| Fix rounds | |
| Review findings: real / noise / deferred | |
| Regressions introduced | |
| Bugs escaped to production | |
