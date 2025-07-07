# 💅 Salonų Valdymo Sistema
 
Tai yra pilna grožio salonų valdymo sistema, sukurta naudojant React.js frontend'ą ir Node.js backend'ą. Sistema leidžia valdyti salonus, vartotojus ir rezervacijas su autentifikacijos funkcijomis.
 
## 🌟 Funkcijos
 
### 👤 Vartotojų valdymas
- **Registracija ir prisijungimas** - saugus autentifikavimas su JWT tokenais
- **Administratoriaus teisės** - specialūs administratoriaus veiksmai
- **Vartotojų sąrašas** - administratoriai gali peržiūrėti visus vartotojus
 
### 🏢 Salonų valdymas (tik administratoriams)
- **CRUD operacijos** - kurti, skaityti, atnaujinti, trinti
- **Kategorijos** - skirtingos salonų kategorijos (Grožio salonas, Kirpykla, SPA, Nagų studija, Masažo studija)
- **Reitingų sistema** - 1-5 balų vertinimo sistema
- **Paieška ir rūšiavimas** - lengvas salonų paieška ir rūšiavimas
- **Puslapių skaidymas** - efektyvus didelių duomenų atvaizdavimas
- **Statistika** - salonų statistikos peržiūra
 
### 📅 Rezervacijų sistema
- **Laiko intervalų rezervacija** - vartotojai gali rezervuoti laiką salonuose
- **Prisijungimo reikalavimas** - tik prisijungę vartotojai gali daryti rezervacijas
- **Mano rezervacijos** - vartotojai gali peržiūrėti ir atšaukti savo rezervacijas
- **Administratoriaus peržiūra** - administratoriai gali matyti visas rezervacijas
 
## 🛠️ Technologijos
 
### Backend
- **Node.js** - serverio aplinka
- **Express.js** - web framework'as
- **Postgres** - duomenų bazė
- **JWT** - autentifikavimas
- **argon2** - slaptažodžių šifravimas
- **CORS** - cross-origin užklausų palaikymas
 
### Frontend
- **React.js** - vartotojo sąsaja
- **Vite** - build įrankis
- **Tailwind CSS** - stilių framework'as
- **Axios** - HTTP užklausų biblioteka
- **React Router** - navigacijos valdymas
 
## 📋 Reikalavimai
 
- **Node.js** (v16 arba naujesnė versija)
- **npm** arba **yarn**
- **Postgresql** duomenų bazė
 
## 🚀 Diegimo instrukcijos
 
### 1. Projekto kloniranje
```bash
git clone <repository-url>
cd Front
```
 
### 2. Backend'o nustatymai
 
```bash
# Pereiti į Backend katalogą
cd back
 
# Įdiegti priklausomybes
npm install
 
# Sukurti .env failą su šiais nustatymais:
DB_HOST=localhost
DB_UNAME=root
DB_PW=your_password
DB_NAME=salonai_db
JWT_SECRET=your_jwt_secret_key
PORT=3000
FE_API_URL=http://localhost:5173   # full url
```
 
### 3. Duomenų bazės nustatymai
 
1. Sukurkite duomenų bazę pas save nurodytu pavadinimu ir paleiskite skriptą:
```bash
node populateDb.js;
```
 
### 5. Frontend'o nustatymai
 
```bash
# Naujame terminale pereiti į Frontend katalogą
cd Front
 
# Įdiegti priklausomybes
npm install
 
# Paleisti development serverį
npm run dev
```
 
## 🎯 Naudojimas
 
### Prisijungimas prie sistemos
 
1. **Atidarykite naršyklę** ir eikite į `http://localhost:5173`
2. **Registruokitės** naują paskyrą arba **prisijunkite** su esamomis prisijungimo duomenimis
3. **Administratoriams** bus prieinamos papildomos funkcijos
 
### Administratoriaus funkcijos
 
#### Salonų valdymas
- Eikite į **Admin Panel → Salonai**
- **Pridėti saloną**: spauskite "➕ Pridėti saloną"
- **Redaguoti**: spauskite "✏️ Redaguoti" prie salono
- **Ištrinti**: spauskite "🗑️ Ištrinti" prie salono
- **Ieškoti**: naudokite paieškos lauką viršuje
- **Rūšiuoti**: spauskite ant stulpelių antraščių
 
#### Vartotojų valdymas
- Eikite į **Admin Panel → Vartotojai**
- Peržiūrėkite visų vartotojų sąrašą
- Matysite vartotojų roles ir registracijos datas
 
### Vartotojų funkcijos
 
#### Rezervacijų kūrimas
1. **Pagrindiniame puslapyje** pasirinkite saloną
2. **Spauskite "Rezervuoti laiką"**
3. **Pasirinkite datą ir laiką**
4. **Patvirtinkite rezervaciją**
 
#### Mano rezervacijos
- Eikite į **Mano rezervacijos**
- Peržiūrėkite visas savo rezervacijas
- **Atšaukite** rezervacijas jei reikia
 
## 🔐 Saugumas
 
- **JWT tokenai** - saugus autentifikavimas
- **Slaptažodžių šifravimas** - bcrypt biblioteka
- **Middleware autorizacija** - prieigos kontrolė
- **CORS konfigūracija** - saugūs cross-origin užklausos
 
## 🗄️ Duomenų bazės schema
 
### 🧑‍💼 `Users` lentelė
Naudotojų duomenų saugojimas.

| Stulpelis     | Tipas         | Aprašymas                             |
|---------------|---------------|----------------------------------------|
| `id`          | SERIAL        | Unikalus naudotojo ID                 |
| `username`    | VARCHAR(255)  | Naudotojo vardas                      |
| `email`       | VARCHAR(255)  | El. pašto adresas (unikalus)         |
| `password`    | VARCHAR(255)  | Šifruotas slaptažodis                 |
| `role`        | VARCHAR(50)   | Rolė („user“ arba „admin“)           |

### 🏠 `Treatments` lentelė
Procedūrų (paslaugų) informacija.

| Stulpelis             | Tipas           | Aprašymas                                     |
|------------------------|----------------|-----------------------------------------------|
| `id`                   | SERIAL         | Unikalus procedūros ID                        |
| `title`                | VARCHAR(255)   | Procedūros pavadinimas                        |
| `category`             | VARCHAR(255)   | Kategorija (pvz. „Hair“, „Nails“, „Massage“) |
| `start_time`           | TIME           | Procedūros pradžios laikas                    |
| `link_to_cover_image`  | VARCHAR(500)   | Nuoroda į nuotrauką                           |
| `created_at`           | TIMESTAMP      | Sukūrimo data                                 |
| `updated_at`           | TIMESTAMP      | Atnaujinimo data                              |

### 📅 `Treatment_Reservations` lentelė
Rezervacijų informacija.

| Stulpelis       | Tipas      | Aprašymas                                                    |
|------------------|------------|---------------------------------------------------------------|
| `id`             | SERIAL     | Unikalus rezervacijos ID                                     |
| `user_id`        | INTEGER    | Naudotojo ID (nuoroda į `Users`)                             |
| `treatment_id`   | INTEGER    | Procedūros ID (nuoroda į `Treatments`)                       |
| `reserved_at`    | TIMESTAMP  | Kada buvo atlikta rezervacija                               |
| `status`         | VARCHAR(20)| Rezervacijos būsena („reserved“, „completed“, „cancelled“) |
| `rating`         | SMALLINT   | Įvertinimas (1–5)                                            |
| `completed_at`   | TIMESTAMP  | Kada procedūra buvo atlikta (jei pritaikoma)                |
| `notes`          | TEXT       | Papildomos pastabos                                          |

### 📚 `Categories` lentelė
Kategorijos, pagal kurias klasifikuojamos procedūros.

| Stulpelis     | Tipas         | Aprašymas                   |
|----------------|---------------|------------------------------|
| `id`           | SERIAL        | Kategorijos ID              |
| `name`         | VARCHAR(100)  | Kategorijos pavadinimas     |
| `description`  | TEXT          | Aprašymas                   |
| `created_at`   | TIMESTAMP     | Sukūrimo data               |
| `updated_at`   | TIMESTAMP     | Atnaujinimo data            |

 
## 🚨 Dažnos problemos ir sprendimai
 
### Backend negali prisijungti prie duomenų bazės
- Patikrinkite `.env` failo nustatymus
- Įsitikinkite kad MySQL serveris paleistas
- Patikrinkite duomenų bazės pavadinimą ir kredencialus
 
### Frontend negali pasiekti backend'o
- Patikrinkite ar backend serveris veikia ant port 3000
- Patikrinkite CORS nustatymus `index.js` faile
 
### JWT token klaidos
- Patikrinkite ar `JWT_SECRET` nustatytas `.env` faile
- Pabandykite atsijungti ir vėl prisijungti
 
## 🤝 Indėlis į projektą
 
1. **Fork'inti** projektą
2. **Sukurti** naują feature branch'ą
3. **Commit'inti** pakeitimus
4. **Push'inti** į branch'ą
5. **Sukurti** Pull Request
 
## 📞 Kontaktai
 
Jei turite klausimų ar problemų, susisiekite su projekto kūrėjais.
 
## 📄 Licencija
 
Šis projektas yra skirtas edukaciniams tikslams.
 
---
 
**Sėkmingos salonų valdymo!** 💅✨