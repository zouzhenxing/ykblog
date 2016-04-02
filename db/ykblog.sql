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

