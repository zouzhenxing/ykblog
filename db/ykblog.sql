/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/3/28 9:42:54                            */
/*==============================================================*/
create database ykblog default charset utf8;

use ykblog;


drop table if exists admin;

drop table if exists news;

drop table if exists newtype;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   aname                varchar(50),
   apwd                 varchar(50),
   issuper              int,
   primary key (aid)
);
insert into admin values(default,'zouzx@yuanku.org','yuanku123',0);

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   ntitle               varchar(400),
   aid                  int,
   addtime              datetime,
   ncontent             text,
   typeid               int,
   primary key (nid)
);

/*==============================================================*/
/* Table: newtype                                               */
/*==============================================================*/
create table newtype
(
   typeid               int not null auto_increment,
   typename             varchar(100),
   ptype                int,
   typeorder            int,
   primary key (typeid)
);

drop table if exists photos;

/*==============================================================*/
/* Table: photos                                                */
/*==============================================================*/
create table photos
(
   pid                  int not null auto_increment,
   pname                varchar(50),
   addtime              datetime,
   primary key (pid)
);

drop table if exists images;

/*==============================================================*/
/* Table: images                                                */
/*==============================================================*/
create table images
(
   imgid                int not null auto_increment,
   imgname              varchar(500),
   imgurl               varchar(100),
   addtime              datetime,
   pid                  int,
   primary key (imgid)
);
