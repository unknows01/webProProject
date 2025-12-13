# ใช้ Nginx เวอร์ชันล่าสุดเป็น Base Image
FROM nginx:latest

# ลบไฟล์เริ่มต้นของ Nginx ออก (เป็นทางเลือก)
RUN rm -rf /usr/share/nginx/html/*

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบัน (my-website) ไปยังโฟลเดอร์ HTML ของ Nginx ในคอนเทนเนอร์
COPY . /usr/share/nginx/html

# เปิดพอร์ต 80 (เป็นเพียง Metadata)
EXPOSE 80

# คำสั่งเริ่มต้นในการรันคอนเทนเนอร์ (ซึ่ง Nginx Base Image มีอยู่แล้ว)
CMD ["nginx", "-g", "daemon off;"]



# docker build -t my-website-nginx .
# docker run --name final-website -p 80:80 -d my-website-nginx
# http://localhost/home/home.html