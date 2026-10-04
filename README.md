# Üniversite Ders Yönetim Sistemi

Bu proje, JavaScript ile asenkron callback'ler, ES6 sınıfları, object property descriptor'lar ve dizi (array) manipülasyonu kullanılarak geliştirilmiş basit bir üniversite notlandırma sistemidir.

## Dosya Organizasyonu

- **models.js**: `Student` sınıfını tanımlar. Öğrencinin `id`, `name` ve `courses` bilgilerini tutar. `id` alanı, constructor içinde `Object.defineProperty()` kullanılarak `writable: false` ve `configurable: false` şeklinde tanımlanır; böylece oluşturulduktan sonra değiştirilemez veya silinemez. Sınıf ayrıca `addCourse()` (yeni ders ekleme) ve `getAverage()` (öğrencinin genel not ortalamasını hesaplama) metotlarını içerir.

- **database.js**: Gerçek bir veritabanı bağlantısını simüle eder. `fetchStudents(callback)` fonksiyonu, `setTimeout` ile 2 saniyelik bir gecikme oluşturur ve bu sürenin sonunda ham öğrenci verisini `callback` fonksiyonuna parametre olarak geçirir.

- **analytics.js**: Öğrenci verileri üzerinde analiz yapan yardımcı fonksiyonları içerir:
  - `calculateClassAverage(students, courseId)`: Belirtilen derse ait tüm öğrencilerin not ortalamasını hesaplar.
  - `findTopStudent(students)`: `.reduce()` kullanarak genel ortalaması en yüksek olan öğrenciyi bulur.
  - `filterStudents(students, criteriaFn)`: Verilen kritere (callback fonksiyonuna) göre öğrencileri filtreleyen genel amaçlı bir higher-order function'dır.

- **main.js**: Programın giriş noktasıdır. `fetchStudents` ile veriyi çeker, ham veriyi `Student` örneklerine dönüştürür, `id` alanının değiştirilemezliğini test eder ve `analytics.js` içindeki fonksiyonları kullanarak raporu konsola yazdırır.

## Karşılaşılan Zorluklar

- `Object.defineProperty()` ile tanımlanan `id` alanının sadece okunabilir olmasını sağlarken, sınıfın diğer alanlarının (`name`, `courses`) normal şekilde atanabilir kalmasına dikkat etmek gerekti. `students[0].id = 999` satırının sessizce (hata fırlatmadan) başarısız olması bekleniyor; bu da `writable: false` davranışının doğru anlaşılmasını gerektirdi.
- `fetchStudents` fonksiyonunun asenkron yapısı nedeniyle, tüm işlemlerin (veri dönüştürme, analiz, yazdırma) `callback` içinde sırayla yapılması gerekti; aksi halde veri henüz gelmeden analiz fonksiyonları çalıştırılmaya çalışılıyordu.
- `findTopStudent` fonksiyonunda `.reduce()` kullanırken başlangıç değeri vermeden ilk elemanı referans almak, iki öğrencinin ortalamasını karşılaştırırken doğru öğrenciyi döndürmeyi sağladı.
- `calculateClassAverage` fonksiyonunda her öğrencinin `courses` dizisinde ilgili `courseId`'yi bulmak için `.find()` kullanıldı; bu derse kayıtlı olmayan öğrencilerin hesaplamayı etkilememesi için `.filter()` ile `undefined` sonuçlar elendi.

## Çalıştırma

```bash
node main.js
```
