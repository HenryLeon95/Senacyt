Create database `senacyt` default character set utf8mb4 default collate utf8mb4_bin;
use senacyt;

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
	person integer,
    acaachi integer,
    constraint FK_PERSON_TYPE_PERSON foreign key (person) references PERSON (id) on delete cascade,
    constraint FK_PERSON_TYPE_ACAACHI foreign key (acaachi) references ACAACHI (id) on delete cascade
);

create table PERSON_AREA (
	person integer,
    area integer,
    constraint FK_PERSON_AREA_PERSON foreign key (person) references PERSON (id) on delete cascade,
    constraint FK_PERSON_AREA_AREA foreign key (area) references AREA (id) on delete cascade
);


