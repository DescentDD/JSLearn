from flask import Flask, request,  render_template
app=Flask(__name__)

@app.route('/')
def index():
    check=request.args.get('check')
    return render_template('index.html',check=check)
@app.route('/register', methods=['post'])
def register():
    name=request.form.get('username')
    password=request.form.get('password')
    if not name or not password:
        return 'error'
    render_template('success.html',name=name,password=password)
    return 'success'
if __name__ == '__main__':
    app.run()