create table public."reading_record"
(
    num         integer     not null
        constraint reading_record_pk
            primary key,
    book_id     varchar(20) not null
        constraint reading_record_reading_list_fk
            references public."reading_list" (book_id),
    user_id     integer     not null
        constraint reading_record_user_id_fk
            references public."user" (user_id),
    read_date   date        not null,
    total_time  integer     not null,
    start_time  time,
    end_time    time
);

comment on table public."reading_record" is '독서 기록 시간';

comment on column public."reading_record".num is '기록 고유 번호 (PK)';

comment on column public."reading_record".book_id is '도서 ID (FK)';

comment on column public."reading_record".user_id is '사용자 ID (FK)';

comment on column public."reading_record".read_date is '독서 일자';

comment on column public."reading_record".total_time is '총 독서 시간 (분)';

comment on column public."reading_record".start_time is '독서 시작 시간';

comment on column public."reading_record".end_time is '독서 종료 시간';

alter table public."reading_record"
    owner to readinglog;
