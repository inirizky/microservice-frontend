# Microservice Frontend


## Prasyarat

* Node.js versi 18 atau lebih baru.

## Cara Instalasi

1. Masuk ke direktori proyek.
2. Instal semua dependensi menggunakan perintah:
```bash
npm install

```



## Konfigurasi

Buat file `.env.local` di direktori utama dan tentukan URL API backend Anda:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_LINKS_SERVICES=http://localhost:3002/api
NEXT_PUBLIC_FE_URL=http://localhost:3000

```

## Cara Menjalankan

Untuk menjalankan aplikasi dalam mode pengembangan:

```bash
npm run dev

```

Aplikasi akan tersedia di `http://localhost:3000`.
