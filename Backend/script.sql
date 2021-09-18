drop database senacyt;
Create database `senacyt` default character set utf8mb4 default collate utf8mb4_bin;
use senacyt;
SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', '')); 


create table PERSON (
	id integer auto_increment,
    username varchar(25) not null,
    password varchar(25) not null,
    name varchar(50) not null,
    last_name varchar(500) not null,
    phone integer,
    address varchar(255),
    birthday date,
    other varchar(255),
    constraint PK_PERSON primary key (id),
    constraint UK_USER_PERSON unique (username)
);

create table TYPEACHI(
	id integer auto_increment,
    name varchar(100) not null,
    constraint PK_TYPEACHI primary key (id),
    constraint UK_NAME_TYPEACHI unique (name)
);

create table ACAACHI (
	id integer auto_increment,
    type integer,
    degree_date date not null,
    title varchar(255) not null,
    institution varchar(255) not null,
    other varchar(255),
    constraint PK_ACAACHI primary key (id),
    constraint FK_ACAACHI foreign key (type) references TYPEACHI (id) on delete cascade
);

create table AREA (
	id integer auto_increment,
    name varchar(255) not null,
    constraint PK_AREA primary key (id),
    constraint UK_NAME_AREA unique (name)
);

create table PERSON_TYPE (
	id integer auto_increment,
	person integer,
    acaachi integer,
    constraint PK_PERSON_TYPE primary key (id),
    constraint FK_PERSON_TYPE_PERSON foreign key (person) references PERSON (id) on delete cascade,
    constraint FK_PERSON_TYPE_ACAACHI foreign key (acaachi) references ACAACHI (id) on delete cascade
);

create table PERSON_AREA (
	id integer auto_increment,
	person integer,
    area integer,
    constraint PK_PERSON_AREA primary key (id),
    constraint FK_PERSON_AREA_PERSON foreign key (person) references PERSON (id) on delete cascade,
    constraint FK_PERSON_AREA_AREA foreign key (area) references AREA (id) on delete cascade
);


SET FOREIGN_KEY_CHECKS = 0; 
truncate table TYPEACHI;
SET FOREIGN_KEY_CHECKS = 1;


insert into PERSON (username, password, name, last_name, phone, address, birthday, other)
values ('HenryLeon', 'HolaHenry_5', 'Henry', 'León', 12345678, 'zona 6', '1995-12-12', "Con fe");
insert into PERSON (username, password, name, last_name, phone, address, birthday)
values ('FranHER', 'HolaHenry_5', 'Henry', 'León', 12345678, 'zona 6', '1995-12-12');

insert into TYPEACHI (name) values ('Licenciatura'),('Maestría'),('Doctorado'),('Diplomado');

insert into AREA (name) values ('Ciencias de la computación'), ('Psicología'), ('Ciencias económicas');


select * from PERSON;
select * from TYPEACHI;
select * from ACAACHI;
select * from PERSON_TYPE;
select * from AREA;
select * from PERSON_AREA;





-- Personas registradas con su último grado académico registrado.
create or replace view person_academic_count as
select p.username, p.name, p.last_name, p.phone, p.address, p.birthday, p.other, t.name as name_academic_achievements, a.degree_date, a.title, a.institution, a.other as other_academic from (
	select MAX(pt.id) id from PERSON_TYPE pt
	group by pt.person
) as v1, PERSON p, TYPEACHI t, ACAACHI a, PERSON_TYPE dp
where v1.id = dp.id
and p.id = dp.person
and a.id = dp.acaachi
and a.type = t.id;

select * from person_academic_count;

-- Todas las áreas de registro con el número de personas que hay en ellas.
select a.name as name_area, Count(pa.area) as amount_people from AREA a, PERSON_AREA pa
where a.id = pa.area
group by (pa.area);




