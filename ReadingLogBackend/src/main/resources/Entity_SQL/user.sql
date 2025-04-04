create table public."user"
(
    user_id    integer     not null
        constraint user_pk
            primary key,
    user_uuid  varchar(8)  not null,
    nickname   varchar(20) not null,
    user_email varchar(20) not null,
    ins_date   timestamp   not null,
    upd_date   timestamp
);

comment on table public."user" is '회원정보';

comment on column public."user".user_id is '사용자 자동ID';

comment on column public."user".user_uuid is '사용자 UUID';

comment on column public."user".nickname is '사용자 닉네임';

comment on column public."user".user_email is '사용자 EMAIL';

comment on column public."user".ins_date is '계정 생성일';

comment on column public."user".upd_date is '계정 수정일';

alter table public."user"
    owner to readinglog;

